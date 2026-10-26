import { pool } from "@/lib/db";

export async function POST(request: Request) {
    const client = await pool.connect();

    try {
        const { title, description, questions, settings, userId } = await request.json();
        console.log(title, description, questions, settings, userId, 'all the data');

        await client.query("BEGIN");

        // Create the form
        const formResult = await client.query(
            `INSERT INTO forms (owner_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, status, public_id`,
            [userId, title.trim(), description ?? ""]
        );

        const form = formResult.rows[0];

        // Save questions
        for (const [index, question] of questions.entries()) {
            await client.query(
                `INSERT INTO questions
          (form_id, title, type, required, options, position)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
                [
                    form.id,
                    question.title,
                    question.type,
                    question.required,
                    JSON.stringify(question.options ?? []),
                    index,
                ]
            );
        }

        // Save chatbot settings
        await client.query(
            `INSERT INTO chatbot_settings (
        form_id,
        welcome_message,
        completion_message,
        primary_color,
        input_placeholder,
        launcher_button_text,
        chatbot_position,
        opening_behavior,
        auto_open_delay_seconds,
        allow_restart,
        show_branding,
        show_progress_indicator
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                form.id,
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

        await client.query("COMMIT");

        return Response.json(
            { success: true, message: 'Form created succesfully', form },
            { status: 201 }
        );
    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Failed to create form:", error);

        return Response.json(
            { success: false, message: "Failed to create form." },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}