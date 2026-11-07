import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTag,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading Profile...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
    <div className="max-w-4xl mx-auto">

      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-10 text-center text-white">

          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-emerald-700 shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-emerald-100">
            View your personal information.
          </p>

        </div>

        {/* Profile Details */}

        <div className="grid gap-6 p-8 sm:grid-cols-2">

          {/* Name */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <FaUser />
              </div>

              <h3 className="font-semibold text-slate-700">
                Name
              </h3>

            </div>

            <p className="text-lg font-semibold text-slate-800">
              {user.name}
            </p>

          </div>

          {/* Email */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                <FaEnvelope />
              </div>

              <h3 className="font-semibold text-slate-700">
                Email
              </h3>

            </div>

            <p className="break-all text-lg font-semibold text-slate-800">
              {user.email}
            </p>

          </div>

          {/* Phone */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <FaPhone />
              </div>

              <h3 className="font-semibold text-slate-700">
                Phone
              </h3>

            </div>

            <p className="text-lg font-semibold text-slate-800">
              {user.phone || "Not Available"}
            </p>

          </div>

          {/* Role */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                <FaUserTag />
              </div>

              <h3 className="font-semibold text-slate-700">
                Role
              </h3>

            </div>

            <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold capitalize text-emerald-700">
              {user.role}
            </span>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}

export default Profile;