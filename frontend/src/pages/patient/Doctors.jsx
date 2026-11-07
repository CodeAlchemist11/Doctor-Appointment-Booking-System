import { useEffect, useState } from "react";
import { getAllDoctors } from "../../services/doctorService";
import { Link } from "react-router-dom";

import DoctorCard from "../../components/patient/DoctorCard";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await getAllDoctors();

            // Handles both:
            // { doctors: [...] }
            // OR directly [...]
            const doctorList = data.doctors || data;

            setDoctors(doctorList);
            setFilteredDoctors(doctorList);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
  const value = e.target.value;

  setSearchTerm(value);

  const filtered = doctors.filter((doctor) =>
    doctor.specialization
      ?.toLowerCase()
      .includes(value.toLowerCase())
  );

  setFilteredDoctors(filtered);
};

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <h2 className="text-xl font-semibold">Loading doctors...</h2>
            </div>
        );
    }

    return (
  <div className="min-h-screen bg-slate-100 py-8 sm:py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Header */}

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-10 text-center text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Our Doctors
        </h1>

        <p className="mt-3 text-emerald-100 text-lg">
          Find experienced specialists and book your appointment with confidence.
        </p>

      </div>

      {/* Search Bar */}

      <div className="mb-10 flex justify-center">

        <div className="relative w-full max-w-xl">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by specialization..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-5 shadow-md transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />

        </div>

      </div>

      {/* Doctors */}

      {filteredDoctors.length === 0 ? (

        <div className="rounded-3xl bg-white p-14 text-center shadow-lg">

          <div className="mb-5 text-6xl">
            👨‍⚕️
          </div>

          <h2 className="text-2xl font-bold text-slate-700">
            No Doctors Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try searching with another specialization.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {filteredDoctors.map((doctor) => (

            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />

          ))}

        </div>

      )}

    </div>
  </div>
);
}

export default Doctors;