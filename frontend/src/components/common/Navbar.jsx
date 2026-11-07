import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Stethoscope,
  CalendarDays,
  Bell,
  User,
  LogOut,
  LogIn,
  UserPlus,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-emerald-100 text-emerald-700 font-semibold"
        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg">
            <HeartPulse size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              MediCare
            </h1>
            <p className="text-xs text-slate-500">
              Healthcare
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">

          <NavLink to="/" className={navLinkClass}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/doctors" className={navLinkClass}>
            <Stethoscope size={18} />
            Doctors
          </NavLink>

          {user ? (
            <>

              <NavLink
                to="/my-appointments"
                className={navLinkClass}
              >
                <CalendarDays size={18} />
                My Appointments
              </NavLink>

              <NavLink
                to="/notifications"
                className={navLinkClass}
              >
                <Bell size={18} />
                Notifications
              </NavLink>

              <NavLink
                to="/profile"
                className={navLinkClass}
              >
                <User size={18} />
                Profile
              </NavLink>

              {/* User */}
              <div className="ml-2 flex items-center gap-3 rounded-full bg-emerald-100 px-3 py-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="font-semibold text-emerald-700">
                  {user.name}
                </span>

              </div>

              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>

            </>
          ) : (
            <>

              <NavLink to="/login" className={navLinkClass}>
                <LogIn size={18} />
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="ml-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-2 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <UserPlus size={18} />
                Register
              </NavLink>

            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-200 p-2 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">

          <div className="space-y-2 p-5">

            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/doctors"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Stethoscope size={18} />
              Doctors
            </NavLink>

            {user ? (
              <>

                <NavLink
                  to="/my-appointments"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <CalendarDays size={18} />
                  My Appointments
                </NavLink>

                <NavLink
                  to="/notifications"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <Bell size={18} />
                  Notifications
                </NavLink>

                <NavLink
                  to="/profile"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  Profile
                </NavLink>

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-100 p-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-emerald-700">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Logged In
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white transition-all duration-300 hover:bg-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (
              <>

                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} />
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-3 text-white shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus size={18} />
                  Register
                </NavLink>

              </>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;