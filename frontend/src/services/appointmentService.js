import { apiRequest } from "../utils/api";

export const bookAppointment = (appointmentData) => {
  return apiRequest("/appointments", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });
};

export const getMyAppointments = () => {
  return apiRequest("/appointments/my");
};

export const cancelAppointment = (id) => {
  return apiRequest(`/appointments/${id}/cancel`, {
    method: "PUT",
  });
};