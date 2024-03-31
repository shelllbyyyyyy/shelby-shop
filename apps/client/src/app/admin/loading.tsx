import * as Icon from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-2">
      <Icon.Loader2 size={32} className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
