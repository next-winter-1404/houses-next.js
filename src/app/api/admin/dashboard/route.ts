import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.get(`${BaseUrl}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data?.message ||
          "خطا در دریافت اطلاعات داشبورد ادمین",
      },
      { status: error.response?.status || 500 },
    );
  }
}
