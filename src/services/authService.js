import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1/auth";


export const signupUser = async (userData) => {
  const payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
    password: userData.password,
    role: userData.user_role,
  };

  const response = await axios.post(
    `${API_BASE_URL}/signup`,
    payload
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    userData
  );

  return response.data;
};