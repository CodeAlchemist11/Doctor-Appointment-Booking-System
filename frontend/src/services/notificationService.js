import { apiRequest } from "../utils/api";

export const getMyNotifications = async () => {
  return await apiRequest("/notifications");
};

export const markAsRead = async (id) => {
  return await apiRequest(`/notifications/${id}/read`, {
    method: "PUT",
  });
};