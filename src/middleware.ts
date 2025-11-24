import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("portfolio-token")?.value;

  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   const decoded = verifyToken(token);
  //   if (!decoded) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
