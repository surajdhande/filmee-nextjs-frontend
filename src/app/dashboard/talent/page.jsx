"use client";
 
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Talent/Dashboard";
 
export default function TalentDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
 
    if (!storedUser || !token) {
      router.replace("/login");
      return;
    }
 
    setReady(true);
  }, [router]);
 
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }
 
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    }>
      <Dashboard />
    </Suspense>
  );
}
