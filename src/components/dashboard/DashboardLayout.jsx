import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({
  children,
  header = null,
  role = "FILMMAKER",
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0B0B] text-white">
      {/* Sidebar */}
      <aside className="hidden w-[240px] shrink-0 flex-col bg-[#0B0B0B] lg:flex">
        <Sidebar role={role} />
      </aside>

      {/* Right Side */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Optional Header */}
        {header && <div className="shrink-0">{header}</div>}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B0B0B]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;