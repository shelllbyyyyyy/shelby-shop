import React from "react";

import { cn } from "@/lib/utils";

type WrapperProps = {
  className?: string;
  children: React.ReactNode;
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={cn("h-auto md:w-8/12 lg:w-6/12 xl:w-6/12", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
