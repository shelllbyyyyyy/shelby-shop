import * as Icon from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Icon.Loader2 size={32} className="animate-spin duration-300" />
    </div>
  );
};
