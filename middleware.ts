import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const someURL = [
    "/blog/step-by-step-guide-how-to-download-and-install-cricket-07-game",
    "/blog/icc-t20-world-cup-2021-india-hd-kit-for-ea-sports-cricket-07",
    "/blog/download-install-icc-t20-world-cup-2024-india-kit-for-cricket-07",
  ];

  if (someURL.includes(pathName)) {
    const redirectUrl = new URL(pathName, "https://cricket-sync.vercel.app");
    return NextResponse.redirect(redirectUrl, 301);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
