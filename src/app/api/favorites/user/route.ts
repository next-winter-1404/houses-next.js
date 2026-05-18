// app/api/user/favorites/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Token required" }, { status: 401 });
    }
    const decoded = jwt.decode(token);
    const userId = decoded?.id;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    const response = await fetch(
      `http://next.genzuni.website/api/favorites/user/${userId}?page=${page}&limit=${limit}&order=ASC`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Favorite Fetch Error:", error);
    return NextResponse.json(
      { message: "Error fetching favorites" },
      { status: 500 },
    );
  }
}


