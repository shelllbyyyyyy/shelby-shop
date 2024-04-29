"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  path: string;
  icon: any;
  tittle: string;
};

export const SidebarItems: React.FC<SidebarItemProps> = ({
  path,
  icon,
  tittle,
}) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={path}
        className={`group relative flex bg-card items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes(path) && "bg-accent dark:bg-meta-4"
        }`}
      >
        {icon}
        <h1 className="text-black"> {tittle}</h1>
      </Link>
    </>
  );
};
