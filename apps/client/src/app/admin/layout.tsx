"use client";

import React, { useState } from "react";
import Header from "./_components/Header";
import Sidebar2 from "./_components/Sidebar2";

export const dynamic = "force-dynamic";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative flex w-full overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative flex w-full min-h-screen mt-20 sm:mt-28">
          <Sidebar2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 w-full lg:w-[calc(100%-256px)] lg:ml-64 mb-5">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
