"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TalentApplicationsRoute() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/talent?tab=applications");
  }, [router]);
  return null;
}
