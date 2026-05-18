import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { BaseUrl } from "@/core/api/BaseUrl";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const status = searchParams.get("status") ?? "";
    const sort = searchParams.get("sort") ?? "createdAt";
    const order = searchParams.get("order") ?? "DESC";

    const url = `${BaseUrl}/api/payments?page=${page}&limit=${limit}&status=${status}&sort=${sort}&order=${order}`;

    const response = await axios.get(url, {
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

    const response = await axios.post(`${BaseUrl}/api/payments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("TOKEN:", token);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Request failed" },
      { status: error.response?.status || 500 },
    );
  }
}
