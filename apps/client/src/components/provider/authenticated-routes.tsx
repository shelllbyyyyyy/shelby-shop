import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type AuthenticatedProps = {
  children: React.ReactNode;
};

const AuthenticatedRoutes = async ({ children }: AuthenticatedProps) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default AuthenticatedRoutes;
