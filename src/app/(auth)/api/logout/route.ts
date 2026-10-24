import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ message: "Logout failed." }, { status: 500 });
  }
}
