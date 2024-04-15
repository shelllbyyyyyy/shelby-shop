import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(req: NextRequest) {
  const supabase = createClient();

  const redirectUrl = req.nextUrl.clone();
  const adminPath = "/admin";
  const authPath = "/auth";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== process.env.EMAIL_ADMIN) {
    if (req.nextUrl.pathname.startsWith(adminPath)) {
      return new NextResponse(
        JSON.stringify({ message: " Only admin can access this " }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  if (!user) {
    redirectUrl.pathname = "/auth";
    return NextResponse.redirect(redirectUrl);
  } else {
    if (req.nextUrl.pathname.startsWith(authPath)) {
      redirectUrl.pathname = "/home";
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/home/:path*",
    "/product/:path*",
    "/profile/:path*",
    "/auth/:path*",
  ],
};
