import { useEffect, useState } from "react";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../../services/doctorService";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await getDoctorAppointments();
      setAppointments(data.appointments);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Doctor Appointments
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and update your patient appointments.
        </p>
      </div>

      {appointments.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

          <div className="text-6xl mb-4">
            📅
          </div>

          <h2 className="text-2xl font-bold text-slate-700">
            No Appointments Found
          </h2>

          <p className="mt-2 text-slate-500">
            New appointments will appear here.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {appointments.map((appointment) => (

            <div
              key={appointment._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden"
            >

              {/* Top Section */}

              <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div className="flex items-center gap-4">

                    <div className="h-16 w-16 rounded-full bg-white text-emerald-700 flex items-center justify-center text-2xl font-bold">

                      {appointment.patientId?.name?.charAt(0)}

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {appointment.patientId?.name}
                      </h2>

                      <p className="text-emerald-100">
                        Patient Details
                      </p>

                    </div>

                  </div>

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

                </div>

              </div>

              {/* Details */}

              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500">
                      Email
                    </p>
                    <h3 className="font-semibold text-slate-700 break-all">
                      {appointment.patientId?.email}
                    </h3>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500">
                      Phone
                    </p>
                    <h3 className="font-semibold text-slate-700">
                      {appointment.patientId?.phone}
                    </h3>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500">
                      Appointment Date
                    </p>
                    <h3 className="font-semibold text-slate-700">
                      {appointment.appointmentDate}
                    </h3>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500">
                      Appointment Time
                    </p>
                    <h3 className="font-semibold text-slate-700">
                      {appointment.appointmentTime}
                    </h3>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 md:col-span-2">
                    <p className="text-sm text-slate-500">
                      Reason
                    </p>
                    <h3 className="font-semibold text-slate-700">
                      {appointment.reason || "N/A"}
                    </h3>
                  </div>

                </div>

                {/* Status Update */}

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-6">

                  <div>

                    <p className="text-sm text-slate-500">
                      Update Appointment Status
                    </p>

                    <h3 className="font-semibold text-slate-700">
                      Current Status: {appointment.status}
                    </h3>

                  </div>

                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      handleStatusChange(
                        appointment._id,
                        e.target.value
                      )
                    }
                    className="w-full sm:w-56 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="Pending">
                      🟡 Pending
                    </option>

                    <option value="Confirmed">
                      🔵 Confirmed
                    </option>

                    <option value="Completed">
                      🟢 Completed
                    </option>

                    <option value="Cancelled">
                      🔴 Cancelled
                    </option>

                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </div>
);
}

export default Appointments;