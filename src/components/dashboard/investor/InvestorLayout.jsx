"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "../DashboardLayout";
import DashboardHeader from "../DashboardHeader";

export default function InvestorLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ full_name: "Mervin Consultant" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("investor_user");
    localStorage.removeItem("investor_token");
    router.push("/");
  };

  const profileName = user?.full_name || user?.name || "Mervin Consultant";

  return (
    <DashboardLayout
      role="INVESTOR"
      header={
        <DashboardHeader
          username={profileName}
          dashboardTitle="Investor Dashboard"
          settingsPath="/dashboard/investor/settings"
          onLogout={handleLogout}
          statusText="Offline"
          statusColor="#E50914"
        />
      }
    >
      {children}
    </DashboardLayout>
  );
}
