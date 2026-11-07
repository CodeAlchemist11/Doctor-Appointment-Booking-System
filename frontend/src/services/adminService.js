import { apiRequest } from "../utils/api";

// Dashboard
export const getDashboard = () => {
  return apiRequest("/admin/dashboard");
};

// Patients
export const getAllPatients = () => {
  return apiRequest("/admin/patients");
};

export const deletePatient = (id) => {
  return apiRequest(`/admin/patients/${id}`, {
    method: "DELETE",
  });
};

export const searchPatients = (keyword) => {
  return apiRequest(`/admin/patients/search?keyword=${keyword}`);
};

// Doctors
export const getAllDoctorsAdmin = () => {
  return apiRequest("/admin/doctors");
};

export const deleteDoctorAdmin = (id) => {
  return apiRequest(`/admin/doctors/${id}`, {
    method: "DELETE",
  });
};

export const searchDoctors = (keyword) => {
  return apiRequest(`/admin/doctors/search?keyword=${keyword}`);
};

// Appointments
export const getAllAppointments = () => {
  return apiRequest("/admin/appointments");
};

export const addDoctor = (doctorData) => {
  return apiRequest("/doctors", {
    method: "POST",
    body: doctorData,
  });
};

export const getDoctorByIdAdmin = (id) => {
  return apiRequest(`/doctors/${id}`);
};

export const updateDoctorAdmin = (id, doctorData) => {
  return apiRequest(`/doctors/${id}`, {
    method: "PUT",
    body: JSON.stringify(doctorData),
  });
};