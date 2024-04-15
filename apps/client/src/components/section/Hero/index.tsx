import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/elements/Container";

export const Hero = () => {
  return (
    <div className="bg-slate-200">
      <Container className="flex justify-center items-center h-[400px] sm:h-[600px]">
        <div className="mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality
            <span className="text-accent/90"> Clothes</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose d">
            Welcome to ShelbyShop. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/home" className={buttonVariants()}>
              start shopping
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
