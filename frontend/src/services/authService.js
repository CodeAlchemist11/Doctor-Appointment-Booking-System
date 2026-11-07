import { apiRequest } from "../utils/api";

export const registerUser = (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getProfile = () => {
  return apiRequest("/auth/profile");
};