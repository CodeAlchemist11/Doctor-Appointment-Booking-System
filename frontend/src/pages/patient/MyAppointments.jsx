import { useEffect, useState } from "react";
import { getMyAppointments } from "../../services/appointmentService";
import AppointmentCard from "../../components/patient/AppointmentCard";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data.appointments);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100 py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">

      {/* Header */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          My Appointments
        </h1>

        <p className="mt-3 text-emerald-100 text-lg">
          View, manage and keep track of all your upcoming appointments.
        </p>

      </div>

      {/* Appointment List */}
      {appointments.length === 0 ? (

        <div className="rounded-3xl bg-white px-8 py-16 text-center shadow-xl">

          <div className="mb-5 text-6xl">
            📅
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Appointments Yet
          </h2>

          <p className="mt-3 text-slate-500">
            You haven't booked any appointments yet.
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onCancel={fetchAppointments}
            />
          ))}

        </div>

      )}

    </div>
  </div>
);
}

export default MyAppointments;