import * as Icon from "lucide-react";
import Link from "next/link";

import DarkModeSwitcher from "./DarkModeSwitcher";

import { AvatarDropdown } from "../Navigationbar/components/AvatarDopdown";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex h-32 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-10 lg:hidden"
          >
            <Icon.AlignJustifyIcon size={18} />
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <h1 className="text-lg md:text-2xl font-bold uppercase">
              <span className="text-red-500">S</span>helby.Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-3 ">
          <DarkModeSwitcher />
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
