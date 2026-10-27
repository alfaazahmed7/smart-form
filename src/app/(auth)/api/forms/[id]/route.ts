
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { CurrentUserDecodedId } from "@/services/reusable.services";

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