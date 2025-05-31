import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('connect.sid')
    const { pathname } = request.nextUrl

    const authPages = ["/sign-up", "/sign-in", "/verify-email"]

    if (cookie && authPages.some((page) => pathname.startsWith(page))) {
        return NextResponse.redirect(new URL("/", request.url)) // request.url is the base url
    }

    return NextResponse.next()
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify-email"],
};