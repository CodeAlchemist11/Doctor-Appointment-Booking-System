import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-green-500">
              MediCare+
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Your trusted healthcare platform for finding doctors,
              booking appointments and receiving quality medical care.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
              >
                <FaGithub />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="hover:text-green-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/doctors" className="hover:text-green-500 transition">
                  Doctors
                </Link>
              </li>

              <li>
                <Link
                  to="/my-appointments"
                  className="hover:text-green-500 transition"
                >
                  My Appointments
                </Link>
              </li>

              <li>
                <Link
                  to="/notifications"
                  className="hover:text-green-500 transition"
                >
                  Notifications
                </Link>
              </li>

            </ul>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Services
            </h3>

            <ul className="space-y-3">

              <li>General Medicine</li>
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Orthopaedics</li>
              <li>Dermatology</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <span>support@medicare.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-500 mt-1" />
                <span>Bhubaneswar, Odisha, India</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MediCare+. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">

            <Link to="/" className="hover:text-green-500 transition">
              Privacy Policy
            </Link>

            <Link to="/" className="hover:text-green-500 transition">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;