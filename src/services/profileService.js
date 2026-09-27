import { apiClient } from "@/lib/apiClient";

export async function getMyProfile() {
  const response = await apiClient.get("/profile/me");
  return response.data.profile;
}

export async function updateMyProfile(data) {
  const response = await apiClient.put("/profile/me", data);
  return response.data;
}

export async function exportMyData() {
  const response = await apiClient.get("/profile/me/export");
  return response.data;
}

export async function deleteMyAccount() {
  const response = await apiClient.delete("/profile/me");
  return response.data;
}
