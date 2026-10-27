import { pool } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const client = await pool.connect();

    try {
        const { title, description, questions, settings, userId } = await request.json();
        console.log(title, description, questions, settings, userId, 'all the data');

        await client.query("BEGIN");

        // Create the form
        const formResult = await client.query(
            `INSERT INTO forms (owner_id, title, description, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, description, status, public_id`,
            [userId, title.trim(), description ?? "", 'published']
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

export async function GET() {
    try {
        const token = (await cookies()).get('token')?.value;
        console.log(token, 'token');

        if (!token) {
            return NextResponse.json(
                { message: 'Not logged in' },
                { status: 401 }
            );
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not configured');
        }

        const decoded = jwt.verify(token, secret);

        if (typeof decoded === 'string' || !decoded.id) {
            return NextResponse.json(
                { message: 'Invalid session' },
                { status: 401 }
            )
        }

        const userId = decoded.id;
        console.log(userId);

        const result = await pool.query(
            `SELECT
          f.id,
          f.title,
          f.description,
          f.public_id,
          f.created_at,
          COUNT(DISTINCT q.id)::int AS question_count
       FROM forms f
       LEFT JOIN questions q ON q.form_id = f.id
       WHERE f.owner_id = $1
       GROUP BY f.id
       ORDER BY f.created_at DESC`,
            [userId]
        );

        return Response.json({
            success: true,
            forms: result.rows,
        });
    } catch (error) {
        console.error("Failed to fetch forms:", error);

        return Response.json(
            { success: false, message: "Failed to fetch forms." },
            { status: 500 }
        );
    }
}
