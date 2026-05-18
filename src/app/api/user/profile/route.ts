import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

function getUserIdFromToken(token: string) {
  const decoded = jwt.decode(token) as { id: string } | null;
  return decoded?.id;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userResponse = await fetch(
      `http://next.genzuni.website/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const activityResponse = await fetch(
      `http://next.genzuni.website/api/user-activity/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: userResponse.status },
      );
    }

    if (!activityResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user activity" },
        { status: activityResponse.status },
      );
    }

    const userData = await userResponse.json();
    const activityData = await activityResponse.json();

    return NextResponse.json({
      user: userData,
      activity: activityData,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(
      `http://next.genzuni.website/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update user data" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("🔥 Server Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
