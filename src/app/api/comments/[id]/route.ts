import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.put(
      `${BaseUrl}/api/comments/${params.id}`,
      {
        title: body.title,
        caption: body.caption,
        rating: Number(body.rating),
      },
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to update comment",
        error: error?.response?.data ?? error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
