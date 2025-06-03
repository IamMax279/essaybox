import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('connect.sid')
  const { pathname } = request.nextUrl

  const authPages = ["/sign-up", "/sign-in", "/verify-email"]
  const authorized = ["/chat/nowy"]

  if (cookie && authPages.some((page) => (pathname.startsWith(page) || pathname === '/'))) {
      return NextResponse.redirect(new URL("/chat/nowy", request.url)) // request.url is the base url
  }

  if (!cookie && authorized.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/sign-up", "/verify-email", "/sign-in", "/chat/nowy"],
};