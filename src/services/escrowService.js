import { apiClient } from "@/lib/apiClient";

export async function getMyEscrowTransactions() {
  const response = await apiClient.get("/escrow/my-transactions");
  return response.data.transactions || [];
}
