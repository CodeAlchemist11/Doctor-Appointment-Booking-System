import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user?.role === "doctor") {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return <Home />;
}

export default HomeRedirect;