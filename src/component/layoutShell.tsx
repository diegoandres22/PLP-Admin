"use client";

import { Sidebar, MiniBar } from "@/component/2-sections";
import { usePathname } from "next/navigation";

export const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLogin = pathname === "/";

  return (
    <>
      {!isLogin && (
        <>
          <Sidebar />
          <MiniBar />
        </>
      )}
      {children}
    </>
  );
}
