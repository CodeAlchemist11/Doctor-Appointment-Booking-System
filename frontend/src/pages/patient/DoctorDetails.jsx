import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDoctorById } from "../../services/doctorService";

import { useAuth } from "../../context/AuthContext";
import SlotSelector from "../../components/patient/SlotSelector";
import { bookAppointment } from "../../services/appointmentService";


function DoctorDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState("");
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const fetchDoctor = async () => {
        try {
            const data = await getDoctorById(id);
            setDoctor(data.doctor || data);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!user) {
            alert("Please login first.");
            return;
        }

        if (!selectedSlot) {
            alert("Please select a slot.");
            return;
        }

        try {
            setBooking(true);

            const payload = {
                doctorId: doctor._id,
                appointmentDate: selectedSlot.date,
                appointmentTime: selectedSlot.startTime,
                reason,
            };

            const data = await bookAppointment(payload);

            alert(data.message);

            fetchDoctor();

            setSelectedSlot(null);
            setReason("");

        } catch (err) {
            alert(err.message);
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex justify-center items-center">
                Loading doctor...
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-[70vh] flex justify-center items-center">
                Doctor not found.
            </div>
        );
    }

    return (
  <div className="min-h-screen bg-slate-100 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Doctor Details */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="grid lg:grid-cols-3">

          {/* Left Side */}

          <div className="relative p-6 bg-slate-50">

            <img
              src={
                doctor.image ||
                "https://via.placeholder.com/400x500?text=Doctor"
              }
              alt={doctor.userId?.name}
              className="h-full w-full rounded-3xl object-cover shadow-lg"
            />

            <div className="absolute left-10 top-10">

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-md ${
                  doctor.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.available ? "🟢 Available" : "🔴 Unavailable"}
              </span>

            </div>

          </div>

          {/* Right Side */}

          <div className="lg:col-span-2 p-8 lg:p-10">

            <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {doctor.specialization}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-slate-800">
              {doctor.userId?.name}
            </h1>

            <p className="mt-2 text-slate-500">
              Experienced healthcare professional dedicated to providing quality medical care.
            </p>

            {/* Information */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  💼 Experience
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {doctor.experience} Years
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  💰 Consultation Fee
                </p>

                <h3 className="mt-2 text-xl font-bold text-emerald-700">
                  ₹{doctor.consultationFee}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  🏥 Hospital
                </p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  {doctor.hospital}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  🎓 Education
                </p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  {doctor.education}
                </h3>
              </div>

            </div>

            {/* About */}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <h2 className="text-2xl font-bold text-slate-800">
                About Doctor
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {doctor.about || "No description available."}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Booking Section */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              Available Slots
            </h2>

            <p className="mt-2 text-slate-500">
              Select your preferred appointment time.
            </p>

          </div>

        </div>

        <SlotSelector
          slots={doctor.availableSlots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />

        {selectedSlot && (

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <label className="mb-3 block text-lg font-semibold text-slate-700">
              Reason for Visit
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white p-4 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Describe your symptoms or reason for consultation..."
            />

            <button
              onClick={handleBooking}
              disabled={booking}
              className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {booking ? "Booking..." : "Book Appointment"}
            </button>

          </div>

        )}

      </div>

    </div>
  </div>
);
}

export default DoctorDetails;