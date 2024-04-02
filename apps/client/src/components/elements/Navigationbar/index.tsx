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

import { useAppSelector } from "@/lib/redux/store";

const NavigationBar = () => {
  const isLogin = useAppSelector((state) => state.authslice.isLoggin);

  return (
    <>
      <nav className="fixed top-0 bg-white shadow w-full z-10">
        <Container>
          <NavigationMenu className="px-5 py-5 md:px-20 md:py-10 w-full">
            <NavigationMenuList>
              <NavigationMenuItem className="flex justify-center items-center">
                <NavigationMenuLink href="/">
                  <h1 className="text-lg md:text-2xl font-bold uppercase">
                    <span className="text-red-500">S</span>helby.Shop
                  </h1>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div className="flex justify-center items-center gap-3 text-[11px] md:gap-8 md:text-sm font-bold">
                  <NavigationMenuLink href="/home">
                    <h2 className="hover:text-accent">Home</h2>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/product">
                    <h2 className="hover:text-accent">Our Product</h2>
                  </NavigationMenuLink>
                  <Icon.ShoppingBag size={18} />
                  {isLogin ? <AvatarDropdown /> : null}
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Container>
      </nav>
    </>
  );
};

export default NavigationBar;
