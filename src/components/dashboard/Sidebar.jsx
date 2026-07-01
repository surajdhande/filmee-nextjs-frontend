"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Users,
  Shield,
  MessageSquare,
  BarChart3,
  User,
  Crown,
  Briefcase,
  Bookmark,
  Star,
  Folder,
  Settings,
  FileText,
} from "lucide-react";

const MENU_CONFIG = {
  FILMMAKER: [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard/filmmaker",
  },
  {
    name: "Projects",
    icon: Film,
    href: "/dashboard/filmmaker/projects",
  },
  {
    name: "Investor Applications",
    icon: Users,
    href: "/dashboard/filmmaker/applications",
  },
  {
    name: "Escrow & Payments",
    icon: Shield,
    href: "/dashboard/filmmaker/payments",
  },
  {
    name: "Messages",
    icon: MessageSquare,
    href: "/dashboard/filmmaker/messages",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/filmmaker/analytics",
  },
  {
    name: "Profile",
    icon: User,
    href: "/dashboard/filmmaker/profile",
  },
  {
    name: "Subscription",
    icon: Crown,
    href: "/dashboard/filmmaker/subscription",
  },
],
  INVESTOR: [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/investor" },
    { name: "Investments", icon: Briefcase, href: "/dashboard/investor/investments" },
    { name: "Saved Projects", icon: Bookmark, href: "/dashboard/investor/saved" },
    { name: "Messages", icon: MessageSquare, href: "/dashboard/investor/messages" },
    { name: "Settings", icon: Settings, href: "/dashboard/investor/settings" },
  ],
  TALENT: [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/talent" },
    { name: "Auditions", icon: Star, href: "/dashboard/talent/auditions" },
    { name: "Applications", icon: FileText, href: "/dashboard/talent/applications" },
    { name: "Portfolio", icon: Folder, href: "/dashboard/talent/portfolio" },
    { name: "Messages", icon: MessageSquare, href: "/dashboard/talent/messages" },
    { name: "Settings", icon: Settings, href: "/dashboard/talent/settings" },
  ],
};

const Sidebar = ({ role = "FILMMAKER", userName = "User" }) => {
  const pathname = usePathname();
  const menuItems = MENU_CONFIG[role] || [];

  return (
    <div className="flex h-full flex-col bg-[#171717]">
    {/* Logo & Welcome */}
    <div className="px-7 pt-6">
      <Link href="/" className="inline-block">
        <Image
        src="/logo.png"
        alt="Filmee Logo"
        width={118}
        height={30}
            priority
            className="object-contain"
        />
        </Link>


    </div>

    {/* Menu */}
    <nav className="mt-10 flex-1 px-5">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex h-12 items-center gap-2.5 rounded-xl px-4 transition-all duration-300 ${
                isActive
                  ? "bg-[#F20D16] text-white shadow-[0_0_25px_rgba(242,13,22,0.45)]"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                strokeWidth={2}
                className={`${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-white"
                }`}
              />

              <span className="text-[15px] font-semibold whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  </div>
);
};

export default Sidebar;
