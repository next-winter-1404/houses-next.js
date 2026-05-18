import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

export async function GET() {
  const cookieStore = await cookies();
  console.log("ALL COOKIES:", cookieStore.getAll());

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.get(`${BaseUrl}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Request failed" },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    
    const body = await request.json();

    const response = await axios.post(`${BaseUrl}/api/bookings`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Booking POST Error:", error.response?.data);
    return NextResponse.json(
      { message: error.response?.data?.message || "ثبت رزرو با خطا مواجه شد" },
      { status: error.response?.status || 500 },
    );
  }
}

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
