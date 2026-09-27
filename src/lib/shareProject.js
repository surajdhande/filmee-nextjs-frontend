export function getProjectShareUrl(projectId, role = "investor") {
  if (typeof window === "undefined") {
    return `/dashboard/${role}/film/${projectId}`;
  }
  const path =
    role === "filmmaker"
      ? `/dashboard/filmmaker/projects/${projectId}`
      : `/dashboard/investor/film/${projectId}`;
  return `${window.location.origin}${path}`;
}

export async function shareProject({ title, projectId, role = "investor" }) {
  const url = getProjectShareUrl(projectId, role);
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ title: title || "Filmee project", url });
    return "shared";
  }
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return "copied";
  }
  return "unsupported";
}

const LOCAL_KEY = "filmee_saved_projects";

export function getLocalSavedProjectIds(role = "investor") {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${LOCAL_KEY}_${role}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setLocalSavedProjectIds(role, ids) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${LOCAL_KEY}_${role}`, JSON.stringify(ids));
}
