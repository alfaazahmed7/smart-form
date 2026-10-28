import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '30d' }
    )
};

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email.trim().toLowerCase()]
        );

        const user = result.rows[0];

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const token = generateToken(user.id);

            const response = NextResponse.json({
                success: true,
                message: 'Login Successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 30
            });

            return response;
        }
        else {
            return NextResponse.json(
                { message: "Invalid email or password." },
                { status: 401 }
            );
        }
    }
    catch (error) {
        console.error("Login failed:", error);

        return NextResponse.json(
            { message: "Login failed." },
            { status: 500 }
        );
    }
}