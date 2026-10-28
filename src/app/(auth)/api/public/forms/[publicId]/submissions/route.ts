import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(
    request: Request,
    { params }: { params: Promise<{ publicId: string }> }
) {
    try {
        const { publicId } = await params;
        const body = await request.json();
        const submittedAnswers = Array.isArray(body?.answers) ? body.answers : null;

        if (!submittedAnswers) {
            return NextResponse.json(
                { success: false, message: "Answers are required." },
                { status: 400 }
            );
        }

        // Find the form by its public id and make sure it is published.
        const formResult = await pool.query(
            `SELECT id, status FROM forms WHERE public_id = $1`,
            [publicId]
        );

        if (formResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Form not found." },
                { status: 404 }
            );
        }

        const form = formResult.rows[0];

        if (form.status !== "published") {
            return NextResponse.json(
                { success: false, message: "This form is not published." },
                { status: 404 }
            );
        }

        // Retrieve the authoritative question data from PostgreSQL.
        const questionsResult = await pool.query(
            `SELECT id, title, type, required, options
       FROM questions
       WHERE form_id = $1
       ORDER BY position ASC`,
            [form.id]
        );

        const questions = questionsResult.rows;

        if (questions.length === 0) {
            return NextResponse.json(
                { success: false, message: "This form has no questions." },
                { status: 400 }
            );
        }

        const questionMap = new Map(questions.map((q) => [q.id, q]));

        // Build a lookup of submitted answers by question id.
        const submittedMap = new Map<string, string>();
        for (const item of submittedAnswers) {
            if (!item || typeof item.questionId !== "string") {
                return NextResponse.json(
                    { success: false, message: "Invalid answer format." },
                    { status: 400 }
                );
            }

            // Make sure the submitted question actually belongs to this form.
            if (!questionMap.has(item.questionId)) {
                return NextResponse.json(
                    { success: false, message: "A submitted question does not belong to this form." },
                    { status: 400 }
                );
            }

            const answerValue =
                item.answer === null || item.answer === undefined
                    ? ""
                    : String(item.answer);

            submittedMap.set(item.questionId, answerValue);
        }

        // Validate every question using the database's authoritative data.
        for (const question of questions) {
            const answer = submittedMap.has(question.id)
                ? submittedMap.get(question.id) ?? ""
                : "";

            if (question.required && answer.trim() === "") {
                return NextResponse.json(
                    { success: false, message: `"${question.title}" is required.` },
                    { status: 400 }
                );
            }

            if (answer.trim() === "") {
                continue;
            }

            if (question.type === "email") {
                if (!EMAIL_REGEX.test(answer.trim())) {
                    return NextResponse.json(
                        { success: false, message: `"${question.title}" must be a valid email address.` },
                        { status: 400 }
                    );
                }
            }

            if (question.type === "multiple_choice") {
                const options = Array.isArray(question.options)
                    ? question.options
                    : [];
                if (!options.includes(answer)) {
                    return NextResponse.json(
                        { success: false, message: `"${question.title}" has an invalid option.` },
                        { status: 400 }
                    );
                }
            }

            if (question.type === "yes_no") {
                if (answer !== "Yes" && answer !== "No") {
                    return NextResponse.json(
                        { success: false, message: `"${question.title}" must be Yes or No.` },
                        { status: 400 }
                    );
                }
            }
        }

        // Build the stored answers using the authoritative question data.
        const storedAnswers = questions.map((question) => ({
            questionId: question.id,
            question: question.title,
            type: question.type,
            answer: submittedMap.has(question.id)
                ? submittedMap.get(question.id) ?? ""
                : "",
        }));

        const insertResult = await pool.query(
            `INSERT INTO submissions (form_id, answers)
       VALUES ($1, $2::jsonb)
       RETURNING id`,
            [form.id, JSON.stringify({ answers: storedAnswers })]
        );

        return NextResponse.json({
            success: true,
            message: "Submission saved successfully.",
            submissionId: insertResult.rows[0].id,
        });
    } catch (error) {
        console.error("Failed to save submission:", error);

        return NextResponse.json(
            { success: false, message: "Failed to save submission." },
            { status: 500 }
        );
    }
}
