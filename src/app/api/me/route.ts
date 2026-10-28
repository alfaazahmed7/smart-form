import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const token = (await cookies()).get('token')?.value;

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
        // console.log(decoded, 'decoded');

        if (typeof decoded === 'string' || !decoded.id) {
            return NextResponse.json(
                { message: 'Invalid session' },
                { status: 401 }
            )
        }

        const result = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1',
            [decoded.id]
        );

        if (!result.rows.length) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User found successfully',
            user: result.rows[0],
        });
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { message: "Invalid or expired session." },
                { status: 401 }
            );
        }

        console.error("Failed to identify user:", error);

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}