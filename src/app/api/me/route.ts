// app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    const decoded = jwt.decode(token) as { role?: string } | null;
    const role = decoded?.role;

    if (!role) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    return NextResponse.json({ role });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}
