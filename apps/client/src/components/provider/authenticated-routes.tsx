import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type AuthenticatedProps = {
  children: React.ReactNode;
};

const AuthenticatedRoutes = async ({ children }: AuthenticatedProps) => {
  const user = cookies().get("sb-jknednnvxbnawmfltvfy-auth-token.0");

  if (!user) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default AuthenticatedRoutes;
