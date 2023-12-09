import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPocketBase } from "./server/pocketBase";

export async function middleware(request: NextRequest) {
  const pb = getPocketBase(request);

  const response = NextResponse.next();

  return response;

  // console.log("middlware request cookie  ===",)

  // const cookie = await getNextjsCookie(request_cookie);
  // const pb = new PocketBase(pb_url);
  // if (cookie) {
  //   try {
  //     pb.authStore.loadFromCookie(cookie);
  //   } catch (error) {
  //     pb.authStore.clear();
  //     response.headers.set(
  //       "set-cookie",
  //       pb.authStore.exportToCookie({ httpOnly: false }),
  //     );
  //   }
  // }

  // try {
  //   // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
  //   pb.authStore.isValid &&
  //     (await pb.collection(pb_user_collection).authRefresh());
  // } catch (err) {
  //   // clear the auth store on failed refresh
  //   pb.authStore.clear();
  //   response.headers.set(
  //     "set-cookie",
  //     pb.authStore.exportToCookie({ httpOnly: false }),
  //   );
  // }

  // if (!pb.authStore.model && !request.nextUrl.pathname.startsWith("/auth")) {
  //   const redirect_to = new URL("/auth", request.url);
  //   if (request.nextUrl.pathname) {
  //     redirect_to.search = new URLSearchParams({
  //       next: request.nextUrl.pathname,
  //     }).toString();
  //   } else {
  //     redirect_to.search = new URLSearchParams({
  //       next: "/",
  //     }).toString();
  //   }

  //   return NextResponse.redirect(redirect_to);
  // }

  // if (pb.authStore.model && request.nextUrl.pathname.startsWith("/auth")) {
  //   const next_url = request.headers.get("next-url") as string;
  //   if (next_url) {
  //     const redirect_to = new URL(next_url, request.url);
  //     return NextResponse.redirect(redirect_to);
  //   }
  //   const redirect_to = new URL(`/`, request.url);
  //   return NextResponse.redirect(redirect_to);
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
