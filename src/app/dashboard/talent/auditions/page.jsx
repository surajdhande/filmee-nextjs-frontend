"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TalentAuditionsRoute() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/talent?tab=find-roles");
  }, [router]);
  return null;
}
