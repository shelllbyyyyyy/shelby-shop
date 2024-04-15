"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/elements/Header";
import Sidebar from "@/components/elements/Sidebar";

import { supabaseClient } from "@/utils/supabase/client";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabaseClient.auth.onAuthStateChange((event, session) => {
  //     if (!session) {
  //       router.push("/auth");
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
