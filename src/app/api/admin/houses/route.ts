import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.get(`${BaseUrl}/api/admin/houses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "خطا در دریافت لیست خانه‌ها",
      },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const body = await request.json();

    const response = await axios.post(`${BaseUrl}/api/admin/houses`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "خطا در ایجاد خانه جدید",
      },
      { status: error.response?.status || 500 },
    );
  }
}
