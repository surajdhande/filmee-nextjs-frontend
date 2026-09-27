/**
 * Shared API origin and URL helpers.
 * Set NEXT_PUBLIC_API_URL in .env.local (see .env.example).
 */

const DEFAULT_API_ORIGIN = "http://127.0.0.1:5000";

export function getApiOrigin() {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (!raw || !String(raw).trim()) {
    return DEFAULT_API_ORIGIN;
  }
  return String(raw).replace(/\/$/, "");
}

/** Base URL for REST v1 routes, e.g. http://127.0.0.1:5000/api/v1 */
export function getApiV1Base() {
  return `${getApiOrigin()}/api/v1`;
}

/**
 * Build a full v1 API URL. Path must start with / (e.g. "/projects/").
 */
export function apiV1(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiV1Base()}${normalized}`;
}

/** Socket.IO server origin (same host as API by default). */
export function getSocketOrigin() {
  return getApiOrigin();
}

/**
 * Auth token for the current dashboard context (filmmaker / investor / talent tabs).
 */
export function getStoredAuthToken() {
  if (typeof window === "undefined") return null;

  const path = window.location.pathname;
  if (path.includes("/dashboard/filmmaker")) {
    return localStorage.getItem("filmmaker_token") || localStorage.getItem("token");
  }
  if (path.includes("/dashboard/investor")) {
    return localStorage.getItem("investor_token") || localStorage.getItem("token");
  }
  if (path.includes("/dashboard/talent")) {
    return localStorage.getItem("talent_token") || localStorage.getItem("token");
  }
  return localStorage.getItem("token");
}

export function getAuthHeaders() {
  const token = getStoredAuthToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/** Standard backend error shape: { message: string } */
export function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
}
