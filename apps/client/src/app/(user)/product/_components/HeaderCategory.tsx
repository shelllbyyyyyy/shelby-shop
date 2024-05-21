"use client";

import React from "react";
import { useFetchCategoryQuery } from "@shelby/api";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CategoriesItem } from "./items/CategoriesItem";
import { Button } from "@/components/ui/button";

const HeaderCategory = () => {
  const { data: categories } = useFetchCategoryQuery({});

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-auto gap-3">
        <div className="flex w-full lg:w-2/4 justify-between text-center items-center">
          {categories?.data.map((category) => (
            <CategoriesItem id={category.id} name={category.name} />
          ))}
        </div>
        <div className="relative w-full lg:w-2/4">
          <Button
            variant="ghost"
            className="absolute z-10 right-0 text-muted-foreground hover:bg-muted"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Input placeholder="Search by product name" />
        </div>
      </div>
    </>
  );
};

export default HeaderCategory;
