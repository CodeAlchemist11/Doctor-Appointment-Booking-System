import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
  <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

    {/* Doctor Image */}
    <div className="relative overflow-hidden">

      <img
        src={
          doctor.image ||
          "https://via.placeholder.com/400x300?text=Doctor"
        }
        alt={doctor.userId?.name}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <span
        className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${
          doctor.available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {doctor.available ? "🟢 Available" : "🔴 Unavailable"}
      </span>

    </div>

    {/* Content */}
    <div className="p-6">

      <h2 className="text-2xl font-bold text-slate-800">
        {doctor.userId?.name}
      </h2>

      <p className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
        {doctor.specialization}
      </p>

      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-slate-500">
            💼 Experience
          </span>

          <span className="font-semibold text-slate-700">
            {doctor.experience} Years
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-slate-500">
            🏥 Hospital
          </span>

          <span className="font-semibold text-slate-700 text-right">
            {doctor.hospital}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-slate-500">
            💰 Fee
          </span>

          <span className="text-lg font-bold text-emerald-700">
            ₹{doctor.consultationFee}
          </span>
        </div>

      </div>

      <Link
        to={`/doctors/${doctor._id}`}
        className="mt-6 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:brightness-110"
      >
        View Profile
      </Link>

    </div>

  </div>
);
}

export default DoctorCard;