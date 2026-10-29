import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // No token means the user is not logged in.
    if (!token) {
        return NextResponse.redirect(new URL("/sign-up", request.url));
    }

    const secret = process.env.JWT_SECRET;

    // A missing server secret is a configuration error,
    // not an ordinary unauthenticated request.
    if (!secret) {
        console.error("JWT_SECRET is not configured");

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

    try {
        const decoded = jwt.verify(token, secret);

        // The token must contain the expected user ID.
        if (
            typeof decoded === "string" ||
            typeof decoded.id !== "string" ||
            !decoded.id
        ) {
            return NextResponse.redirect(
                new URL("/sign-up", request.url)
            );
        }

        // The token is valid. Allow the request to continue.
        return NextResponse.next();
    } catch (error) {
        // Invalid signatures, expired tokens and other JWT
        // verification errors should not grant access.
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.redirect(
                new URL("/sign-up", request.url)
            );
        }

        console.error("Proxy authentication failed:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
    ],
};
