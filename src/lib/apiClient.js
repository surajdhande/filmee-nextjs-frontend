import axios from "axios";
import { getApiV1Base, getAuthHeaders, getApiErrorMessage } from "./apiConfig";

export const apiClient = axios.create({
  baseURL: getApiV1Base(),
});

apiClient.interceptors.request.use((config) => {
  const auth = getAuthHeaders();
  if (auth.Authorization) {
    config.headers.Authorization = auth.Authorization;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("filmmaker_token");
        localStorage.removeItem("filmmaker_user");
        localStorage.removeItem("investor_token");
        localStorage.removeItem("investor_user");
        localStorage.removeItem("talent_token");
        localStorage.removeItem("talent_user");

        const path = window.location.pathname;
        if (path !== "/login" && path !== "/signup" && path !== "/") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export { getApiErrorMessage };
