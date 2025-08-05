// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/";

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/Inicio", req.url));
  }

  return NextResponse.next();
}

// Aplica a TODAS las rutas, excepto las públicas (login, API auth)
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
