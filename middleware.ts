import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/api/webhook",
  "/checkout/stripe(.*)",
]);

async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl;

  return clerkMiddleware(async (auth, req: NextRequest) => {
    const { userId } = await auth();

    // Handle public routes
    if (isPublicRoute(req)) {
      if (
        userId &&
        (url.pathname.startsWith("/auth/sign-in") ||
          url.pathname.startsWith("/auth/sign-up"))
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // Redirect to sign-in if accessing protected routes without authentication
    if (!userId && url.pathname.startsWith("/dashboard")) {
      const signInUrl = new URL("/auth/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", url.pathname);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  })(req, ev);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};

export default middleware;
