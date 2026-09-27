import { apiClient } from "@/lib/apiClient";

export async function getFilmmakerInvestments() {
  const response = await apiClient.get("/investments/for-filmmaker");
  return response.data;
}

export async function updateInvestmentStatus(investmentId, status) {
  const response = await apiClient.patch(`/investments/${investmentId}/status`, {
    status,
  });
  return response.data;
}
