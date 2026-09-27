"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/talent?tab=portfolio");
  }, [router]);
  return null;
}
