import React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn("h-auto max-w-[1440]", className)}>{children}</div>;
};

export default Container;
