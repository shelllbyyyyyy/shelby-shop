"use client";

import React from "react";
import * as Icon from "lucide-react";

import Container from "../Container";
import { AvatarDropdown } from "./components/AvatarDopdown";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NavigationBar = () => {
  return (
    <>
      <Container>
        <NavigationMenu className="bg-white-500 shadow px-20 py-10">
          <NavigationMenuList>
            <NavigationMenuItem>
              <div className="items-center">
                <NavigationMenuLink href="/">
                  <h1 className="text-2xl font-bold uppercase">
                    <span className="text-red-500">S</span>helby.Shop
                  </h1>
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="flex justify-center items-center gap-5 md:gap-8 text-sm font-bold">
                <NavigationMenuLink href="/home">
                  <h2 className="hover:text-accent">Home</h2>
                </NavigationMenuLink>
                <NavigationMenuLink href="/product">
                  <h2 className="hover:text-accent">Our Product</h2>
                </NavigationMenuLink>
                <Icon.ShoppingBag size={18} />
                <AvatarDropdown />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </>
  );
};

export default NavigationBar;
