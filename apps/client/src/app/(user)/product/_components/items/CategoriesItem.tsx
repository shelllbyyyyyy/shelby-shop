import { Category } from "@shelby/db";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface CategoriesItemProps {
  id: string;
  name: string;
  onClick?: () => void;
}

export const CategoriesItem: React.FC<CategoriesItemProps> = ({
  id,
  name,
  onClick,
}) => {
  const pathname = usePathname();

  return (
    <>
      <Link href={`/product/category/${id}`}>
        <h1
          className={`relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-400 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-accent font-semibold ${pathname.includes(id) && "underline decoration-accent decoration-4 underline-offset-4 text-accent"}`}
          onClick={onClick}
        >
          {name}
        </h1>
      </Link>
    </>
  );
};
