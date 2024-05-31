"use client";

import { useState } from "react";
import Link from "next/link";
import * as Icon from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { SidebarItems } from "./items/SidebarItems";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
          <Icon.AlignJustifyIcon size={18} />
        </SheetTrigger>
        <SheetContent side="left" className="flex w-56 flex-col">
          <SheetHeader className="space-y-2.5 pr-6">
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            <SidebarItems
              path="dashboard"
              tittle="Dashboard"
              icon={<Icon.LayoutDashboardIcon />}
            />
            <SidebarItems
              path="product"
              tittle="Product"
              icon={<Icon.Table />}
            />
            <SidebarItems
              path="customer"
              tittle="Customer"
              icon={<Icon.User />}
            />
            <SidebarItems
              path="setting"
              tittle="Setting"
              icon={<Icon.Settings />}
            />
          </div>

          <SheetFooter>
            <span
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Log Out
            </span>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
