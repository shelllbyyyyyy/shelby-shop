import Image from "next/image";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/utils/supabase/client";

import Google from "../../../assets/icon/google.svg";

export const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={signInWithGoogle} size="lg" variant="outline">
      <Image
        src={Google}
        height={20}
        width={20}
        alt="google logo"
        className="mr-2"
      />
      Continue with google
    </Button>
  );
};
