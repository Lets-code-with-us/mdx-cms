import React from "react";
import Sidebar from "@/components/ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <Sidebar className="relative" />
      {children}
    </div>
  );
}

export default Layout;
