
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { CurrentUserDecodedId } from "@/services/reusable.services";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Replace this with your existing verified user ID.
        const userId = await CurrentUserDecodedId();
        console.log(userId, 'userId');

        const formResult = await pool.query(
            `SELECT id, title, description, status, public_id, created_at, updated_at
       FROM forms
       WHERE id = $1 AND owner_id = $2`,
            [id, userId]
        );

        if (formResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Form not found." },
                { status: 404 }
            );
        }

        const questionsResult = await pool.query(
            `SELECT id, title, type, required, options, position
       FROM questions
       WHERE form_id = $1
       ORDER BY position ASC`,
            [id]
        );

        const settingsResult = await pool.query(
            `SELECT *
       FROM chatbot_settings
       WHERE form_id = $1`,
            [id]
        );

        return NextResponse.json({
            success: true,
            form: {
                ...formResult.rows[0],
                questions: questionsResult.rows,
                settings: settingsResult.rows[0] ?? null,
            },
        });
    } catch (error) {
        console.error("Failed to retrieve form:", error);

        return NextResponse.json(
            { success: false, message: "Failed to retrieve form." },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const client = await pool.connect();

    try {
        const { id } = await params;

        const userId = await CurrentUserDecodedId();
        console.log(userId, 'userId');

        const { title, description, questions, settings } =
            await request.json();

        if (
            !title?.trim() ||
            !Array.isArray(questions) ||
            !settings ||
            typeof settings !== "object"
        ) {
            return NextResponse.json(
                { success: false, message: "Invalid form data." },
                { status: 400 }
            );
        }

        await client.query("BEGIN");

        // Update the form only if it belongs to this user.
        const formResult = await client.query(
            `UPDATE forms
       SET title = $1,
           description = $2,
           updated_at = NOW()
       WHERE id = $3 AND owner_id = $4
       RETURNING id`,
            [title.trim(), description ?? "", id, userId]
        );

        if (formResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return NextResponse.json(
                { success: false, message: "Form not found." },
                { status: 404 }
            );
        }

        // Replace the existing questions with the edited questions.
        await client.query(
            "DELETE FROM questions WHERE form_id = $1",
            [id]
        );

        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];

            await client.query(
                `INSERT INTO questions
          (form_id, title, type, required, options, position)
         VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    id,
                    question.title,
                    question.type,
                    question.required ?? false,
                    JSON.stringify(question.options ?? []),
                    index + 1,
                ]
            );
        }

        // Update the existing chatbot settings.
        const settingsResult = await client.query(
            `UPDATE chatbot_settings
       SET welcome_message = $1,
           completion_message = $2,
           primary_color = $3,
           input_placeholder = $4,
           launcher_button_text = $5,
           chatbot_position = $6,
           opening_behavior = $7,
           auto_open_delay_seconds = $8,
           allow_restart = $9,
           show_branding = $10,
           show_progress_indicator = $11
       WHERE form_id = $12
       RETURNING form_id`,
            [
                settings.welcomeMessage,
                settings.completionMessage,
                settings.themeColor,
                settings.inputPlaceholder,
                settings.launcherButtonText,
                settings.chatbotPosition,
                settings.openingBehavior,
                settings.autoOpenDelaySeconds,
                settings.allowRestart,
                settings.showBranding,
                settings.showProgressIndicator,
                id,
            ]
        );

        // Create settings if the form doesn't have a settings row yet.
        if (settingsResult.rows.length === 0) {
            await client.query(
                `INSERT INTO chatbot_settings (
          form_id, welcome_message, completion_message,
          primary_color, input_placeholder, launcher_button_text,
          chatbot_position, opening_behavior, auto_open_delay_seconds,
          allow_restart, show_branding, show_progress_indicator
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [
                    id,
                    settings.welcomeMessage,
                    settings.completionMessage,
                    settings.themeColor,
                    settings.inputPlaceholder,
                    settings.launcherButtonText,
                    settings.chatbotPosition,
                    settings.openingBehavior,
                    settings.autoOpenDelaySeconds,
                    settings.allowRestart,
                    settings.showBranding,
                    settings.showProgressIndicator,
                ]
            );
        }

        await client.query("COMMIT");

        return NextResponse.json({
            success: true,
            message: "Form updated successfully.",
        });
    } catch (error) {
        await client.query("ROLLBACK");

        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { success: false, message: "Invalid session." },
                { status: 401 }
            );
        }

        console.error("Update form error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to update form." },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const userId = await CurrentUserDecodedId();
        console.log(userId, 'userId');

        const result = await pool.query(
            `DELETE FROM forms
       WHERE id = $1 AND owner_id = $2
       RETURNING id`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Form not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Form deleted successfully.",
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { success: false, message: "Invalid session." },
                { status: 401 }
            );
        }

        console.error("Delete form error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to delete form." },
            { status: 500 }
        );
    }
}