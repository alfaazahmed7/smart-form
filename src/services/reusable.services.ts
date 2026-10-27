import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const CurrentUserDecodedId = async () => {
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

    if (typeof decoded === 'string' || !decoded.id) {
        return NextResponse.json(
            { message: 'Invalid session' },
            { status: 401 }
        )
    }

    const userId = decoded.id;
    return userId;
}