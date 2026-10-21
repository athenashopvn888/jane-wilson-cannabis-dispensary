import { NextResponse, type NextRequest } from "next/server";
import { cigaretteRedirects } from "./app/lib/cigaretteRedirects";

const REDIRECTS = new Map(cigaretteRedirects().map((rule) => [rule.source, rule.destination]));

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const destination = REDIRECTS.get(path);
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ["/native-cigarettes-jane-street", "/native-cigarettes-jane-street/:path*", "/item/:path*"]
};
