import React from "react";
import { Billboard as IBillboard } from "@shelby/db";

import Container from "@/components/elements/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BillboardProps {
  data: IBillboard | null;
  children?: React.ReactNode;
  className?: string;
}

export const Billboard: React.FC<BillboardProps> = ({
  data,
  children,
  className,
}) => {
  return (
    <>
      <div className="relative overflow-hidden" id={data?.section}>
        <Image
          alt={data?.section as string}
          src={data?.imageUrl as string}
          fill
          className="rounded-xl object-cover overflow-hidden aspect-square md:aspect-[2.4/1]"
        />
        <Container className="flex justify-center items-center h-[400px] sm:h-[600px]">
          <div className="mx-auto text-center flex flex-col items-center drop-shadow-md">
            <h1 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
              {data?.tittle}
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted">{data?.label}</p>
            <div className={cn(className)}>{children}</div>
          </div>
        </Container>
      </div>
    </>
  );
};
