import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@shelby/supabase";

export const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <Button onClick={signInWithGoogle} size="lg" variant="outline">
      <Image
        src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
        height={24}
        width={24}
        alt="google logo"
      />
      Masuk dengan Google
    </Button>
  );
};
