import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

function getUserIdFromToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    return decoded.id || decoded.user_id;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    const response = await axios.post(
      `${BaseUrl}/api/favorites`,
      {
        house_id: Number(body.house_id),
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to add favorite",
        error: error?.response?.data ?? error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
