import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/cart", "/profile/:path*"],
};
