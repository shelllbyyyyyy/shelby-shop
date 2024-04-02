import React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("h-auto max-w-[1688px] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
