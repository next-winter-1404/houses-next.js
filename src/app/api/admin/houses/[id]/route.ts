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
      `${BaseUrl}/api/admin/houses/${params.id}`,
      body,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "خطا در آپدیت خانه",
        error: error?.response?.data ?? error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axios.delete(
      `${BaseUrl}/api/admin/houses/${params.id}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "خطا در حذف خانه",
        error: error?.response?.data ?? error.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
