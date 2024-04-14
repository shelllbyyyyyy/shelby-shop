import * as Icon from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-11 flex items-center h-16 w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none lg:hidden">
      <div className="flex items-center gap-2 sm:gap-4 lg:hidden ml-6">
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
    </header>
  );
};

export default Header;
