import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUserMd,
    FaUserPlus,
    FaUsers,
    FaCalendarAlt,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? "bg-white text-green-700 font-semibold"
            : "hover:bg-green-600"
        }`;



    return (
        <aside className="fixed top-0 left-0 w-64 h-screen bg-green-700 text-white shadow-lg flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-green-600">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-2">
                <NavLink to="/admin/dashboard" className={menuClass}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/doctors" className={menuClass}>
                    <FaUserMd />
                    <span>Doctors</span>
                </NavLink>

                <NavLink to="/admin/doctors/add" className={menuClass}>
                    <FaUserPlus />
                    <span>Add Doctor</span>
                </NavLink>

                <NavLink to="/admin/patients" className={menuClass}>
                    <FaUsers />
                    <span>Patients</span>
                </NavLink>

                <NavLink to="/admin/appointments" className={menuClass}>
                    <FaCalendarAlt />
                    <span>Appointments</span>
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;