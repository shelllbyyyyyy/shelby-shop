import React from "react";

import { cn } from "@/lib/utils";

type WrapperProps = {
  className?: string;
  children: React.ReactNode;
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={cn("h-auto w-full", className)}>{children}</div>;
};

export default Wrapper;
