import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";

const DashboardLayout = ({
  children,
  header = null,
  role = "FILMMAKER",
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0B0B] text-white">
      {/* Sidebar */}
      <aside className="hidden w-[240px] shrink-0 bg-[#0B0B0B] lg:flex lg:flex-col">

      <div className="flex h-[74px] items-center justify-center border-b border-[#262626]">
        <Image
          src="/logo.png"
          alt="Filmee"
          width={110}
          height={32}
          className="object-contain"
        />
      </div>

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