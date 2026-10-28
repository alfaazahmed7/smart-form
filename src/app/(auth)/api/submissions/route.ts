// export const dynamic = "force-dynamic";


import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { CurrentUserDecodedId } from "@/services/reusable.services";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const userId = await CurrentUserDecodedId();

        // CurrentUserDecodedId can return a NextResponse on failure.
        if (userId instanceof NextResponse) {
            return userId;
        }

        const result = await pool.query(
            `SELECT s.id, s.form_id, f.title AS form_title, s.answers, s.submitted_at
       FROM submissions s
       JOIN forms f ON f.id = s.form_id
       WHERE f.owner_id = $1
       ORDER BY s.submitted_at DESC`,
            [userId]
        );

        return NextResponse.json({
            success: true,
            submissions: result.rows,
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired session." },
                { status: 401 }
            );
        }

        console.error("Failed to fetch submissions:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch submissions." },
            { status: 500 }
        );
    }
}
