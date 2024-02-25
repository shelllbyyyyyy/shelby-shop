import Image from "next/image";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/utils/supabase/client";

import Facebook from "../../../assets/icon/facebook.svg";

export const SignInWithFacebookButton = () => {
  const signInWithFacebook = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={signInWithFacebook} size="lg" variant="outline">
      <Image
        src={Facebook}
        height={20}
        width={20}
        alt="google logo"
        className="mr-2"
      />
      Continue with facebook
    </Button>
  );
};
