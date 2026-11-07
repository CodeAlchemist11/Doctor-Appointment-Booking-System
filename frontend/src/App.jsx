import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/patient/Doctors";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DoctorDetails from "./pages/patient/DoctorDetails";
import MyAppointments from "./pages/patient/MyAppointments";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorSlots from "./pages/doctor/Slots";
import DoctorAppointments from "./pages/doctor/Appointments";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDoctors from "./pages/admin/Doctors";
import AdminPatients from "./pages/admin/Patients";
import AdminAppointments from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import EditDoctor from "./pages/admin/EditDoctor";
import Profile from "./pages/Profile";
import DoctorLayout from "./components/doctor/DoctorLayout";
import HomeRedirect from "./routes/HomeRedirect";

function App() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  const isDoctorRoute =
    location.pathname === "/doctor" ||
    location.pathname.startsWith("/doctor/");

  return (
    <>
      {!isAdminRoute && !isDoctorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors/:id"
          element={
            <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={["patient", "doctor", "admin"]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout>
                <DoctorDashboard />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout>
                <DoctorAppointments />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/slots"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout>
                <DoctorSlots />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/notifications"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout>
                <Notifications />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout>
                <Profile />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && !isDoctorRoute && <Footer />}
    </>
  );
}

export default App;