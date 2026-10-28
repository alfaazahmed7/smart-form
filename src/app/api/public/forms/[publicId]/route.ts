import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ publicId: string }> }
) {
    try {
        const { publicId } = await params;

        const formResult = await pool.query(
            `SELECT id, title, description, status, public_id
       FROM forms
       WHERE public_id = $1`,
            [publicId]
        );

        if (formResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Form not found." },
                { status: 404 }
            );
        }

        const form = formResult.rows[0];

        // Only published forms are available publicly.
        if (form.status !== "published") {
            return NextResponse.json(
                { success: false, message: "This form is not published." },
                { status: 404 }
            );
        }

        const questionsResult = await pool.query(
            `SELECT id, title, type, required, options, position
       FROM questions
       WHERE form_id = $1
       ORDER BY position ASC`,
            [form.id]
        );

        const settingsResult = await pool.query(
            `SELECT welcome_message, completion_message, primary_color,
              input_placeholder, launcher_button_text, chatbot_position,
              opening_behavior, auto_open_delay_seconds, allow_restart,
              show_branding, show_progress_indicator
       FROM chatbot_settings
       WHERE form_id = $1`,
            [form.id]
        );

        const settingsRow = settingsResult.rows[0] ?? null;

        // Map database snake_case settings to the camelCase names used by the frontend.
        const settings = settingsRow
            ? {
                welcomeMessage: settingsRow.welcome_message,
                completionMessage: settingsRow.completion_message,
                themeColor: settingsRow.primary_color,
                inputPlaceholder: settingsRow.input_placeholder,
                launcherButtonText: settingsRow.launcher_button_text,
                chatbotPosition: settingsRow.chatbot_position,
                openingBehavior: settingsRow.opening_behavior,
                autoOpenDelaySeconds: settingsRow.auto_open_delay_seconds,
                allowRestart: settingsRow.allow_restart,
                showBranding: settingsRow.show_branding,
                showProgressIndicator: settingsRow.show_progress_indicator,
            }
            : null;

        return NextResponse.json({
            success: true,
            form: {
                id: form.id,
                title: form.title,
                description: form.description,
                public_id: form.public_id,
                questions: questionsResult.rows,
                settings,
            },
        });
    } catch (error) {
        console.error("Failed to retrieve public form:", error);

        return NextResponse.json(
            { success: false, message: "Failed to retrieve form." },
            { status: 500 }
        );
    }
}
