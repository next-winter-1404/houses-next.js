import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const role = request.cookies.get("role");

  const pathname = request.nextUrl.pathname;
  if (!token && pathname.startsWith("/panel")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (pathname === "/panel/appointments" && role !== "seller") {
  //   return NextResponse.redirect(new URL("/403", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*"],
};
