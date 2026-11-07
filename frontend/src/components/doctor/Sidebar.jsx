import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaClock,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-white text-green-700 font-semibold"
        : "hover:bg-green-600"
    }`;

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-green-700 text-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-green-600">
        <h1 className="text-2xl font-bold">Doctor Panel</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/doctor/dashboard"
          className={menuClass}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className={menuClass}
        >
          <FaCalendarAlt />
          <span>Appointments</span>
        </NavLink>

        <NavLink
          to="/doctor/slots"
          className={menuClass}
        >
          <FaClock />
          <span>Manage Slots</span>
        </NavLink>

        <NavLink
          to="/doctor/notifications"
          className={menuClass}
        >
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/doctor/profile"
          className={menuClass}
        >
          <FaUserCircle />
          <span>Profile</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

      {/* Logout */}
      
    </aside>
  );
};

export default Sidebar;