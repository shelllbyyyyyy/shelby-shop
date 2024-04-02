import React from "react";
import Link from "next/link";
import * as Icon from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="className='w-full flex flex-col justify-center items-center min-h-screen gap-2">
      <h3 className="text-sm md:text-md">Meet shelby</h3>
      <h1 className="text-4xl md:text-6xl font-semibold">
        E-Commerce Simplified
      </h1>
      <div className="flex gap-2 items-center">
        <Link href="/home">
          <Button size="lg" className="md:w-96">
            Start Shopping
          </Button>
        </Link>
        <Button size="circle">
          <Icon.ArrowDown height={15} width={15} />
        </Button>
      </div>
    </section>
  );
};
