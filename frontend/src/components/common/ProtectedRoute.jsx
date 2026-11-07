import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  // Wait until authentication is checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User does not have the required role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;