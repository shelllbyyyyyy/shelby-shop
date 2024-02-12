import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@shelby/supabase";
import Google from "../../../assets/icon/google.svg";

export const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
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
