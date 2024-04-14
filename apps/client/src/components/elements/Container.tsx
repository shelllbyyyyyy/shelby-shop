import React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-auto w-full max-w-[1688px] mx-auto px-5 sm:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
