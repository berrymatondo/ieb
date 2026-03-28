import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/admin/messages", "/admin/documents", "/admin/parametres"]

async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for better-auth session cookie
    const sessionCookie = request.cookies.get("better-auth.session_token")

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export default proxy

export const config = {
  matcher: ["/admin/:path*"],
}
