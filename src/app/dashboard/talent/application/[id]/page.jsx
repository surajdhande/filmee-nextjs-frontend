"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ApplicationDetailPage from "@/components/Talent/ApplicationDetailPage";

export default function ApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
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

  return <ApplicationDetailPage id={Number(params.id)} />;
}
