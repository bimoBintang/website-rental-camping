import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ambil token dari cookies (misalnya cookie bernama token atau session)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  // Batasi akses ke dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Kalau belum ada token, redirect ke /auth
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Optional: Layout tanpa header/footer untuk halaman login
  if (pathname === "/auth") {
    req.headers.set("X-Hide-Layout", "true");
  }

  // Optional: biarkan upload file jalan normal
  if (pathname === "/api/upload") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Middleware akan dijalankan hanya di path tertentu
export const config = {
  matcher: ["/((?!api/auth|api/upload|_next/static|_next/image|favicon.ico).*)"],
};
