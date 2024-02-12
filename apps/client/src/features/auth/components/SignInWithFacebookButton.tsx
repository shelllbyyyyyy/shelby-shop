import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@shelby/supabase";
import Facebook from "@/assets/images/facebook.svg";

export const SignInWithFacebookButton = () => {
  const signInWithFacebook = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "facebook",
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
