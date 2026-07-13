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
    <div className="flex h-full w-[240px] flex-col pl-6 pt-24">
      <nav className="flex-1">
        <div className="flex w-full flex-col space-y-2 rounded-[24px] border border-[#2A2A2A] bg-[#141414] px-6 py-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex h-12 w-full items-center justify-between rounded-full px-4 transition-all duration-200 ${
                  isActive
                    ? "bg-[#232323] text-white py-3"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    size={18}
                    strokeWidth={2}
                    className={`mr-3 shrink-0 ${
                      isActive ? "text-white" : "text-zinc-500 group-hover:text-white"
                    }`}
                  />
                  <span className={`text-[13px] font-bold ${isActive ? "text-white" : ""}`}>
                    {item.name}
                  </span>
                </div>

                {item.badgeCount !== undefined && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E50914] text-[11px] font-bold text-white">
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
