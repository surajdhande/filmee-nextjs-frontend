"use client";

import React from "react";
import Link from "next/link";
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
  Search,
  ArrowLeftRight,
  DollarSign,
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
    { name: "Overview", icon: BarChart3, href: "/dashboard/investor" },
    { name: "Browse Projects", icon: Search, href: "/dashboard/investor/browse" },
    { name: "My Offers", icon: ArrowLeftRight, href: "/dashboard/investor/offers", badgeCount: 1 },
    { name: "My Portfolio", icon: DollarSign, href: "/dashboard/investor/portfolio" },
    { name: "Messages", icon: MessageSquare, href: "/dashboard/investor/messages" },
    { name: "Analytics", icon: Film, href: "/dashboard/investor/analytics" },
    { name: "Subscription", icon: Crown, href: "/dashboard/investor/subscription" },
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
    <div className="flex h-full flex-col bg-[#171717] pt-6 px-2">
      {/* Menu — all items grouped in a single card */}
      <nav className="flex-1">
        <div className="rounded-xl bg-[#1E1E1E] border border-[#2a2a2a] p-2 space-y-0.75">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex h-7 items-center justify-between rounded-lg px-3 transition-all duration-200   ${
                  isActive
                    ? " text-white bg-zinc-900 rounded-full px-1"
                    : " "
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon
                    size={15}
                    strokeWidth={2}
                    className={`shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-500 "
                    }`}
                  />
                  <span className="text-[12px] font-bold whitespace-nowrap">
                    {item.name}
                  </span>
                </div>

                {item.badgeCount !== undefined && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E50914] text-[10px] font-bold text-white">
                    {item.badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
