import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BaseUrl } from "@/core/api/BaseUrl";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const sort = searchParams.get("sort") ?? "created_at";
    const order = searchParams.get("order") ?? "DESC";

    const house_id = searchParams.get("house_id");
    const user_id = searchParams.get("user_id");
    const rating = searchParams.get("rating");

    const params = new URLSearchParams({
      page,
      limit,
      sort,
      order,
    });

    if (house_id && house_id.trim() !== "") {
      params.append("house_id", house_id);
    }
    if (user_id && user_id.trim() !== "") {
      params.append("user_id", user_id);
    }
    if (rating && rating.trim() !== "") {
      params.append("rating", rating);
    }

    const response = await axios.get(
      `${BaseUrl}/api/comments?${params.toString()}`,
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch comments",
        error: error?.response?.data ?? error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload: any = {
      house_id: Number(body.house_id),
      title: body.title,
      caption: body.caption,
      rating: body.rating ?? 5,
    };

    if (
      body.parent_comment_id !== undefined &&
      body.parent_comment_id !== null &&
      String(body.parent_comment_id).trim() !== ""
    ) {
      payload.parent_comment_id = Number(body.parent_comment_id);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.post(`${BaseUrl}/api/comments`, payload, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create comment",
        error: error?.response?.data ?? error?.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
