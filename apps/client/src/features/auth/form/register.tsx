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
import { RegisterFormSchema, registerFormSchema } from "@/types";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const signInWithPassword: SubmitHandler<RegisterFormSchema> = async (
    value
  ) => {
    await supabaseClient.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: {
          full_name: value.name,
        },
      },
    });
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(signInWithPassword)}>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Create an account to continue shopping.
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
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", {
                  required: true,
                })}
                id="name"
                placeholder="Enter your name"
                type="text"
              />
              <p>{errors.name?.message}</p>
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
              <Button type="submit">Sign Up</Button>
              <Button variant="link">Already have an account ?</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Register;
