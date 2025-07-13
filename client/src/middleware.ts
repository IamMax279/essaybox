import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('connect.sid')?.value
  const { pathname } = request.nextUrl

  const authPages = ["/sign-up", "/sign-in", "/verify-email"]
  const authorized = ["/chat/nowy"]

  if (authPages.some((page) => pathname.startsWith(page)) || pathname === '/') {
    console.log("Gerger")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/is-logged-in`,
      { 
        method: 'GET',
        headers: {
          Cookie: cookie ? `connect.sid=${cookie}` : ""
        }
      }
    )

    const data = await response.json()
    console.log("DATA1:", data)
    if (data.success) {
      return NextResponse.redirect(new URL("/chat/nowy", request.url))
    }
  }

  if (authorized.some((page) => pathname.startsWith(page))) {
    console.log("Gerger2")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/is-logged-in`,
      { 
        method: 'GET',
        headers: {
          Cookie: cookie ? `connect.sid=${cookie}` : ""
        }
      }
    )

    const data = await response.json()
    console.log("DATA2:", data)
    if (!data.success) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  if (pathname.startsWith('/chat') && !pathname.startsWith('/chat/nowy')) {
    const parts = pathname.split('/')
    const uuid = parts[2]

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/essay/find-by-uuid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid })
      }
    )

    const data = await response.json()
    if (!data.success) {
      return NextResponse.redirect(new URL("/chat/nowy" + request.url.search, request.url))
    }
  }

  if (pathname.startsWith('/reset-password')) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/is-logged-in`,
      { 
        method: 'GET',
        headers: {
          Cookie: cookie ? `connect.sid=${cookie}` : ""
        }
      }
    )

    const data = await response.json()
    if (!data.success) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/sign-up", "/verify-email", "/sign-in", "/chat/:path*", "/reset-password"],
};