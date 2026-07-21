import { NextResponse } from "next/server";

// Edge gate for /admin/* — a second, independent layer in front of the
// Agent Builder console. Every action the page can take is already enforced
// server-side by the backend's requireAuth + requireAdmin role check; this
// gate exists only to stop the page from being publicly discoverable/loadable
// on the marketing site's domain in the first place.
//
// Fails closed: if ADMIN_GATE_SECRET isn't set in the environment, /admin/*
// 404s unconditionally.
const GATE_COOKIE = "wgw_admin_gate";
const GATE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(req) {
  const secret = process.env.ADMIN_GATE_SECRET;
  if (!secret) {
    return new NextResponse(null, { status: 404 });
  }

  if (req.cookies.get(GATE_COOKIE)?.value === secret) {
    return NextResponse.next();
  }

  const url = req.nextUrl;
  if (url.searchParams.get("gate") === secret) {
    const dest = new URL(url.pathname, url.origin);
    const res = NextResponse.redirect(dest);
    res.cookies.set(GATE_COOKIE, secret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/admin",
      maxAge: GATE_MAX_AGE,
    });
    return res;
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*"],
};
