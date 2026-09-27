import { apiClient } from "@/lib/apiClient";

export const signupUser = async (userData) => {
  const payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
    password: userData.password,
    user_role: userData.user_role,
  };

  const response = await apiClient.post("/auth/signup", payload);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await apiClient.post("/auth/login", userData);

  return response.data;
};
