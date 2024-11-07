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

  if (url.pathname.startsWith("/api/webhook")) {
    const rawBody = await getRawBody(await req.text());
    req.headers.set("rawBody", rawBody.toString("base64"));
    return NextResponse.next();
  }

  return clerkMiddleware(async (auth, req: NextRequest) => {
    const { userId } = await auth();

    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // Handle authenticated requests to auth routes
    if (userId && url.pathname.startsWith("/auth")) {
      const redirectUrl = url.searchParams.get("redirect_url");

      if (url.pathname.startsWith("/auth/sign-up/continue")) {
        return NextResponse.next(); // Allow the user to complete the steps
      }

      if (redirectUrl) {
        return NextResponse.redirect(
          new URL(decodeURIComponent(redirectUrl), req.url)
        );
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!userId && url.pathname.startsWith("/auth")) {
      const signUpUrl = new URL("/auth/sign-up", req.url);
      signUpUrl.searchParams.set("redirect_url", req.url);

      return NextResponse.redirect(signUpUrl);
    }

    if (!userId && url.pathname === "/") {
      const signInUrl = new URL("/auth/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      // return NextResponse.redirect(signInUrl);

      const protocol = req.nextUrl.protocol;
      const host = req.nextUrl.host;

      return NextResponse.redirect(`${protocol}//${host}/auth/sign-in`);
    }

    return NextResponse.next();
  })(req, ev);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};

async function getRawBody(readable: string) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default middleware;
