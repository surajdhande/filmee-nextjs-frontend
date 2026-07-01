import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0B0B0B] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[250px] shrink-0 bg-[#171717] border-r border-[#262626]">
        <Sidebar role="FILMMAKER" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0B0B0B]">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;