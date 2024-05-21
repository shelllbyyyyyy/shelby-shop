"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const Back = () => {
  const router = useRouter();

  return (
    <>
      <Button size="lg" onClick={() => router.back()}>
        Go Back
      </Button>
    </>
  );
};

export default Back;
