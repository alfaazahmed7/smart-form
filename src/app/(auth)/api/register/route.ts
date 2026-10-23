import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
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
        const { name, email, password } = await request.json();
        console.log(name, email, password, 'data');

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);
        console.log(passwordHash, 'passwordHash');

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
            [name.trim(), email.trim().toLowerCase(), passwordHash]
        );

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful.",
                user: result.rows[0],
                token: generateToken(result.rows[0].id)
            },
            { status: 201 }
        );
    } catch (error: any) {
        if (error?.code === "23505") {
            return NextResponse.json(
                { message: "Email already exists." },
                { status: 409 }
            );
        }
        console.error("Registration failed:", error);
        return NextResponse.json(
            { message: "Registration failed." },
            { status: 500 }
        );
    }
}