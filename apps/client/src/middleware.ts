import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(req: NextRequest) {
  const supabase = createClient();

  const adminPath = "/admin";

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
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/home/:path*",
    "/product/:path*",
    "/profile/:path*",
  ],
};
