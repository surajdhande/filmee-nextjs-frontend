import { exportMyData, deleteMyAccount } from "@/services/profileService";

export async function downloadProfileData() {
  const data = await exportMyData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `filmee-data-export-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function requestAccountDeletion({ onSuccess, onError }) {
  const confirmed = window.confirm(
    "This will anonymize your account and log you out. Continue?"
  );
  if (!confirmed) return;
  try {
    await deleteMyAccount();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onSuccess?.();
  } catch (err) {
    onError?.(err);
  }
}
