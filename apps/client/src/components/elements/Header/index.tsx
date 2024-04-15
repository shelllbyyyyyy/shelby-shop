import * as Icon from "lucide-react";
import Link from "next/link";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="flex justify-between items-center h-16 sm:h-24 w-full bg-white shadow lg:hidden lg:mt-6">
      <div className="flex items-center gap-2 sm:gap-4 ml-6">
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
      </div>
      <div className="flex gap-2 mr-6 items-end">
        <Link href="/">
          <h1 className="text-lg sm:text-2xl font-bold uppercase">
            <span className="text-red-500">S</span>helby.Shop
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
