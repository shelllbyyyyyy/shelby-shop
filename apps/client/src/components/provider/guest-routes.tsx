import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type GuestProps = {
  children: React.ReactNode;
};

const GuestRoutes = async ({ children }: GuestProps) => {
  const user = cookies().get("sb-jknednnvxbnawmfltvfy-auth-token.0");

  if (user) {
    redirect("/home");
  }

  return <>{children}</>;
};

export default GuestRoutes;
