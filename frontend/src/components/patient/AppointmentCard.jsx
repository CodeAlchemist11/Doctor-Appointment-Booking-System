import { cancelAppointment } from "../../services/appointmentService";

function AppointmentCard({ appointment, onCancel }) {
  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      const data = await cancelAppointment(appointment._id);

      alert(data.message);

      onCancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const doctor = appointment.doctorId;

  return (
  <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

    <div className="flex flex-col gap-6 p-6 md:flex-row">

      {/* Doctor Image */}

      <div className="relative">

        <img
          src={
            doctor.userId?.image ||
            doctor.image ||
            "https://via.placeholder.com/150"
          }
          alt={doctor.userId?.name}
          className="h-36 w-36 rounded-2xl object-cover shadow-md transition duration-300 group-hover:scale-105"
        />

        <span
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold shadow ${
            appointment.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : appointment.status === "Confirmed"
              ? "bg-blue-100 text-blue-700"
              : appointment.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {appointment.status}
        </span>

      </div>

      {/* Details */}

      <div className="flex-1">

        <h2 className="text-2xl font-bold text-slate-800">
          {doctor.userId?.name}
        </h2>

        <p className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          {doctor.specialization}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              🏥 Hospital
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {doctor.hospital}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              📅 Appointment Date
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              ⏰ Time
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {appointment.appointmentTime}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              📝 Reason
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {appointment.reason || "-"}
            </p>
          </div>

        </div>

        {appointment.status !== "Cancelled" &&
          appointment.status !== "Completed" && (
            <button
              onClick={handleCancel}
              className="mt-6 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-xl"
            >
              Cancel Appointment
            </button>
          )}

      </div>

    </div>

  </div>
);
}

export default AppointmentCard;