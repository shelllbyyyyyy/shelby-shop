import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { supabaseClient } from "@/utils/supabase/client";
import { LoginFormSchema, loginFormSchema } from "@/types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const signInWithPassword: SubmitHandler<LoginFormSchema> = async (value) => {
    await supabaseClient.auth.signInWithPassword({
      email: value.email,
      password: value.password,
    });
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(signInWithPassword)}>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Please sign in to continue shopping.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: true,
                })}
                id="email"
                placeholder="example@email.com"
                type="email"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: true,
                })}
                id="password"
                placeholder="******"
                type="password"
              />
              <p>{errors.password?.message}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center">
              <Button type="submit">Sign In</Button>
              <Button variant="link">Forgot password ?</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Login;
