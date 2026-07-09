import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, header, role = "FILMMAKER" }) => {
  return (
    <div className="flex flex-col h-screen bg-[#0B0B0B] text-white overflow-hidden">

      {/* Navbar — full width across the top */}
      {header && (
        <div className="shrink-0 w-full">
          {header}
        </div>
      )}

      {/* Below navbar: sidebar + content side by side */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden lg:flex w-[220px] shrink-0 flex-col bg-[#171717] border-r border-[#262626]">
          <Sidebar role={role} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B0B0B]">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;