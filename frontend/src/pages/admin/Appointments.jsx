import { useEffect, useState } from "react";
import { getAllAppointments } from "../../services/adminService";
import AdminLayout from "../../components/admin/AdminLayout";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data.appointments);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            All Appointments
          </h1>
          <p className="mt-2 text-slate-500">
            View all appointments booked in the system.
          </p>
        </div>

        {/* ================= Desktop Table ================= */}

        <div className="hidden lg:block overflow-hidden rounded-2xl bg-white shadow-xl">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr className="text-left text-sm uppercase tracking-wider text-slate-600">

                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4 text-center">Status</th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr
                  key={appointment._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  {/* Patient */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                        {appointment.patientId?.name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {appointment.patientId?.name}
                      </span>

                    </div>

                  </td>

                  {/* Doctor */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                        {appointment.doctorId?.userId?.name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {appointment.doctorId?.userId?.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {appointment.appointmentDate}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {appointment.appointmentTime}
                  </td>

                  <td className="px-6 py-5 max-w-xs">
                    <p className="line-clamp-2 text-slate-600">
                      {appointment.reason}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        appointment.status === "Completed"
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

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= Mobile Cards ================= */}

        <div className="grid gap-5 lg:hidden">

          {appointments.map((appointment) => (

            <div
              key={appointment._id}
              className="rounded-2xl bg-white p-5 shadow-lg"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-slate-500">
                    Patient
                  </p>

                  <h2 className="font-bold text-lg text-slate-800">
                    {appointment.patientId?.name}
                  </h2>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === "Completed"
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

              <hr className="my-4" />

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Doctor
                  </span>

                  <span className="font-medium">
                    {appointment.doctorId?.userId?.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Date
                  </span>

                  <span>
                    {appointment.appointmentDate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Time
                  </span>

                  <span>
                    {appointment.appointmentTime}
                  </span>
                </div>

                <div>

                  <p className="text-slate-500 mb-1">
                    Reason
                  </p>

                  <p className="text-slate-700">
                    {appointment.reason}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Empty State */}

        {appointments.length === 0 && (

          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">

            <div className="text-6xl mb-4">
              📅
            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              No Appointments Found
            </h2>

            <p className="mt-2 text-slate-500">
              There are currently no appointments available.
            </p>

          </div>

        )}

      </div>
    </div>
  </AdminLayout>
);
}

export default Appointments;