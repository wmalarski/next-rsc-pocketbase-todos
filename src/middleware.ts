import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { paths } from "./lib/paths";
import { createServerClient } from "./server/pocketBase";

export async function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const { authStore } = createServerClient(cookiesStore);

  if (!authStore.isValid) {
    const origin = new URL(request.url).origin;
    const redirect = `${origin}${paths.signIn}`;
    return NextResponse.redirect(redirect);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-in
     * - sign-up
     * - / (root path)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|service-worker.js|$).*)",
  ],
};
