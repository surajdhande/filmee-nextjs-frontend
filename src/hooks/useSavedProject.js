"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getLocalSavedProjectIds,
  setLocalSavedProjectIds,
} from "@/lib/shareProject";
import { saveProject, unsaveProject } from "@/services/platformService";

export function useSavedProject(projectId, role = "investor") {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const ids = getLocalSavedProjectIds(role);
      setSaved(ids.includes(Number(projectId)));
      return;
    }
    setSaved(false);
  }, [projectId, role]);

  const toggle = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (token) {
        if (saved) {
          await unsaveProject(projectId);
          setSaved(false);
        } else {
          await saveProject(projectId);
          setSaved(true);
        }
      } else {
        const ids = getLocalSavedProjectIds(role);
        const id = Number(projectId);
        let next;
        if (ids.includes(id)) {
          next = ids.filter((x) => x !== id);
          setSaved(false);
        } else {
          next = [...ids, id];
          setSaved(true);
        }
        setLocalSavedProjectIds(role, next);
      }
    } finally {
      setLoading(false);
    }
  }, [projectId, role, saved]);

  return { saved, toggle, loading };
}
