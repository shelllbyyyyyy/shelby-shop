import { Button } from "@/components/ui/button";
import { supabaseClient } from "@shelby/supabase";
import Image from "next/image";
import Github from "../../../assets/icon/github.svg";

export const SignInWithGithubButton = () => {
  const signInWithGithub = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <Button onClick={signInWithGithub} size="lg" variant="outline">
      <Image
        src={Github}
        height={20}
        width={20}
        alt="google logo"
        className="mr-2"
      />
      Continue with github
    </Button>
  );
};
