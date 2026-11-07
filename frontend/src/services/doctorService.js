import { apiRequest } from "../utils/api";

export const getDoctorDashboard = () => {
  return apiRequest("/doctors/dashboard");
};

export const getAllDoctors = () => {
  return apiRequest("/doctors");
};

export const getDoctorById = (doctorId) => {
  return apiRequest(`/doctors/${doctorId}`);
};

// Doctor Availability

export const updateAvailability = (available) => {
  return apiRequest("/doctors/availability", {
    method: "PUT",
    body: JSON.stringify({ available }),
  });
};

// Available Slots

export const getAvailableSlots = () => {
  return apiRequest("/doctors/slots");
};

export const addAvailableSlot = (slotData) => {
  return apiRequest("/doctors/slots", {
    method: "POST",
    body: JSON.stringify(slotData),
  });
};

export const updateAvailableSlot = (slotId, slotData) => {
  return apiRequest(`/doctors/slots/${slotId}`, {
    method: "PUT",
    body: JSON.stringify(slotData),
  });
};

export const deleteAvailableSlot = (slotId) => {
  return apiRequest(`/doctors/slots/${slotId}`, {
    method: "DELETE",
  });
};

// Doctor Appointments

export const getDoctorAppointments = () => {
  return apiRequest("/appointments/doctor");
};

export const updateAppointmentStatus = (appointmentId, status) => {
  return apiRequest(`/appointments/${appointmentId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};