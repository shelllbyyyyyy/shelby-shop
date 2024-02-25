import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type GuestProps = {
  children: React.ReactNode;
};

const GuestRoutes = async ({ children }: GuestProps) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return <>{children}</>;
};

export default GuestRoutes;
