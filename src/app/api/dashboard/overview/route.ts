import { connection } from "next/server";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { CurrentUserDecodedId } from "@/services/reusable.services";
import jwt from "jsonwebtoken";

export async function GET() {
    await connection();
    try {
        const userId = await CurrentUserDecodedId();

        if (userId instanceof NextResponse) {
            return userId;
        }

        const userResult = await pool.query(
            `SELECT id, name, email FROM users WHERE id = $1`,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 401 }
            );
        }

        const user = userResult.rows[0];

        const summaryResult = await pool.query(
            `SELECT
                COUNT(*)::int AS total_forms,
                COUNT(*) FILTER (WHERE f.status = 'published')::int AS published_forms,
                COUNT(*) FILTER (WHERE f.status = 'draft')::int AS draft_forms
            FROM forms f
            WHERE f.owner_id = $1`,
            [userId]
        );

        const summaryRow = summaryResult.rows[0] ?? {};
        const totalForms = Number(summaryRow.total_forms ?? 0);
        const publishedForms = Number(summaryRow.published_forms ?? 0);
        const draftForms = Number(summaryRow.draft_forms ?? 0);

        const totalSubmissionsResult = await pool.query(
            `SELECT COUNT(*)::int AS total_submissions
            FROM submissions s
            JOIN forms f ON f.id = s.form_id
            WHERE f.owner_id = $1`,
            [userId]
        );
        const totalSubmissions = Number(
            totalSubmissionsResult.rows[0]?.total_submissions ?? 0
        );

        const todayResult = await pool.query(
            `SELECT COUNT(*)::int AS submissions_today
            FROM submissions s
            JOIN forms f ON f.id = s.form_id
            WHERE f.owner_id = $1
              AND s.submitted_at >= CURRENT_DATE`,
            [userId]
        );
        const submissionsToday = Number(todayResult.rows[0]?.submissions_today ?? 0);

        const last7Result = await pool.query(
            `SELECT COUNT(*)::int AS submissions_last_7_days
            FROM submissions s
            JOIN forms f ON f.id = s.form_id
            WHERE f.owner_id = $1
              AND s.submitted_at >= NOW() - INTERVAL '7 days'`,
            [userId]
        );
        const submissionsLast7Days = Number(
            last7Result.rows[0]?.submissions_last_7_days ?? 0
        );

        const avgSubmissionsPerPublishedForm =
            publishedForms > 0
                ? Math.round((totalSubmissions / publishedForms) * 10) / 10
                : 0;

        // Activity for the last 30 days.
        const activityResult = await pool.query(
            `SELECT (s.submitted_at AT TIME ZONE 'UTC')::date::text AS day,
                    COUNT(*)::int AS count
            FROM submissions s
            JOIN forms f ON f.id = s.form_id
            WHERE f.owner_id = $1
              AND s.submitted_at >= (CURRENT_DATE - INTERVAL '29 days')
            GROUP BY day
            ORDER BY day ASC`,
            [userId]
        );

        const activityMap = new Map<string, number>();
        for (const row of activityResult.rows) {
            activityMap.set(String(row.day), Number(row.count ?? 0));
        }

        const activity: { date: string; count: number }[] = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
            const d = new Date(
                Date.UTC(
                    today.getUTCFullYear(),
                    today.getUTCMonth(),
                    today.getUTCDate() - i
                )
            );
            const key = d.toISOString().slice(0, 10);
            activity.push({ date: key, count: activityMap.get(key) ?? 0 });
        }

        // Form performance.
        const formPerformanceResult = await pool.query(
            `SELECT f.id,
                    f.title,
                    f.status,
                    f.created_at,
                    f.updated_at,
                    COUNT(s.id)::int AS submission_count
            FROM forms f
            LEFT JOIN submissions s ON s.form_id = f.id
            WHERE f.owner_id = $1
            GROUP BY f.id
            ORDER BY submission_count DESC, f.created_at DESC
            LIMIT 6`,
            [userId]
        );

        const formPerformance = formPerformanceResult.rows.map((row) => ({
            id: String(row.id),
            title: String(row.title ?? ""),
            status: String(row.status ?? "draft"),
            submission_count: Number(row.submission_count ?? 0),
            created_at: String(row.created_at ?? ""),
            updated_at: String(row.updated_at ?? ""),
        }));

        const mostActive = formPerformance.length > 0
            ? formPerformance.reduce((best, current) =>
                current.submission_count > best.submission_count ? current : best
            )
            : null;

        const mostActiveForm =
            mostActive && mostActive.submission_count > 0
                ? { id: mostActive.id, title: mostActive.title, count: mostActive.submission_count }
                : null;

        // Recent submissions.
        const recentResult = await pool.query(
            `SELECT s.id, s.form_id, f.title AS form_title, s.answers, s.submitted_at
            FROM submissions s
            JOIN forms f ON f.id = s.form_id
            WHERE f.owner_id = $1
            ORDER BY s.submitted_at DESC
            LIMIT 5`,
            [userId]
        );

        const recentSubmissions = recentResult.rows.map((row) => ({
            id: String(row.id),
            form_id: String(row.form_id),
            form_title: String(row.form_title ?? ""),
            answers: row.answers ?? null,
            submitted_at: String(row.submitted_at ?? ""),
        }));

        return NextResponse.json({
            success: true,
            user: {
                id: String(user.id),
                name: String(user.name ?? ""),
                email: String(user.email ?? ""),
            },
            summary: {
                totalForms,
                publishedForms,
                draftForms,
                totalSubmissions,
                submissionsToday,
                submissionsLast7Days,
                avgSubmissionsPerPublishedForm,
                mostActiveForm,
            },
            activity,
            formPerformance,
            recentSubmissions,
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired session." },
                { status: 401 }
            );
        }

        console.error("Failed to fetch dashboard overview:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch dashboard overview." },
            { status: 500 }
        );
    }
}

