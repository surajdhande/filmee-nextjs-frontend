"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { X } from "lucide-react";

const DashboardLayout = ({
  children,
  header = null,
  role = "FILMMAKER",
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Listen for custom event from header buttons
  useEffect(() => {
    const handler = () => setSidebarOpen(true);
    window.addEventListener("dashboard:openSidebar", handler);
    return () => window.removeEventListener("dashboard:openSidebar", handler);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0B0B] text-white">

      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
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

      {/* ── Mobile Sidebar Backdrop ──────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Sidebar Drawer ───────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#0B0B0B] border-r border-[#1F1F1F] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-[74px] items-center justify-between border-b border-[#262626] px-5">
          <Image
            src="/logo.png"
            alt="Filmee"
            width={100}
            height={28}
            className="object-contain"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#141414] text-zinc-400 hover:border-[#E50914]/40 hover:text-white transition-all duration-200"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* ── Right Side ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
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