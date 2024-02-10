import { createBrowserClient } from "@supabase/ssr";
import { env } from "../env";

export const supabaseClient = createBrowserClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_KEY
);

export * from "@supabase/auth-helpers-react";
export * from "@supabase/supabase-js";
