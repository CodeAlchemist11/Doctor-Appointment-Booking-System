import { useEffect, useState } from "react";
import {
  getDoctorDashboard,
  updateAvailability,
} from "../../services/doctorService";

function Dashboard() {
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDoctorDashboard();

      setDashboard(data.dashboard);
      setAvailable(data.dashboard.available);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      setToggleLoading(true);

      await updateAvailability(!available);

      setAvailable(!available);
    } catch (error) {
      alert(error.message);
    } finally {
      setToggleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Doctor Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's today's overview.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-10">

          {/* Card 1 */}

          <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-xl transition hover:-translate-y-2">

            <p className="text-emerald-100">
              Total Appointments
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {dashboard?.totalAppointments ?? 0}
            </h2>

          </div>

          {/* Card 2 */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-xl transition hover:-translate-y-2">

            <p className="text-blue-100">
              Today's Appointments
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {dashboard?.todayAppointments ?? 0}
            </h2>

          </div>

          {/* Card 3 */}

          <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-xl transition hover:-translate-y-2">

            <p className="text-purple-100">
              Total Patients
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {dashboard?.totalPatients ?? 0}
            </h2>

          </div>

          {/* Card 4 */}

          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-xl transition hover:-translate-y-2">

            <p className="text-orange-100">
              Earnings
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              ₹{dashboard?.earnings ?? 0}
            </h2>

          </div>

        </div>

        {/* Availability */}

        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 p-8 text-white shadow-2xl mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h2 className="text-2xl font-bold">
                Availability Status
              </h2>

              <p className="mt-2 text-emerald-100">
                Patients can only book appointments while you're available.
              </p>

              <div className="mt-6">

                <span
                  className={`rounded-full px-5 py-2 font-semibold ${available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {available
                    ? "🟢 Available"
                    : "🔴 Unavailable"}
                </span>

              </div>

            </div>

            <button
              onClick={handleToggle}
              disabled={toggleLoading}
              className={`rounded-2xl px-8 py-4 font-semibold shadow-lg transition ${available
                ? "bg-red-600 hover:bg-red-700"
                : "bg-white text-emerald-700 hover:bg-slate-100"
                }`}
            >
              {toggleLoading
                ? "Updating..."
                : available
                  ? "Mark Unavailable"
                  : "Mark Available"}
            </button>

          </div>

        </div>

        {/* Recent Appointments */}

        <div className="rounded-3xl bg-white shadow-xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Recent Appointments
              </h2>

              <p className="text-slate-500">
                Latest patient bookings.
              </p>

            </div>

          </div>

          {dashboard?.recentAppointments?.length > 0 ? (

            <div className="space-y-5">

              {dashboard.recentAppointments.map((appointment) => (

                <div
                  key={appointment._id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-lg hover:border-emerald-400"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">

                        {appointment.patientId?.name
                          ?.charAt(0)}

                      </div>

                      <div>

                        <h3 className="text-lg font-bold text-slate-800">
                          {appointment.patientId?.name}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()}

                          {" • "}

                          {appointment.appointmentTime}

                        </p>

                      </div>

                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${appointment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {appointment.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">

              <div className="text-6xl mb-4">
                📅
              </div>

              <h3 className="text-2xl font-bold text-slate-700">
                No Recent Appointments
              </h3>

              <p className="mt-2 text-slate-500">
                Your latest appointments will appear here.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;