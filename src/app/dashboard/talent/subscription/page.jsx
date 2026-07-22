"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubscriptionPage from "@/components/Talent/SubscriptionPage";

export default function SubscriptionRoutePage() {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SubscriptionPage onBack={() => router.push("/dashboard/talent")} />
    </div>
  );
}
