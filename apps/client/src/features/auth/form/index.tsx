"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Wrapper from "@/components/elements/Wrapper";

import {
  SignInWithFacebookButton,
  SignInWithGithubButton,
  SignInWithGoogleButton,
} from "../components";
import Login from "./login";
import Register from "./register";

export function Form() {
  return (
    <>
      <Wrapper className="flex flex-col justify-center items-center">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Register />
          </TabsContent>
        </Tabs>

        <div>or</div>

        <div className="flex flex-col gap-3 w-full">
          <SignInWithGithubButton />
          <SignInWithGoogleButton />
          <SignInWithFacebookButton />
        </div>
      </Wrapper>
    </>
  );
}
