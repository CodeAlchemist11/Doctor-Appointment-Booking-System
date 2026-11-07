import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDoctors } from "../../services/doctorService";

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();

      // Show only first 4 doctors
      setDoctors(data.doctors.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Meet Our <span className="text-green-600">Specialists</span>
          </h2>

          <p className="text-gray-600 mt-4">
            Experienced doctors dedicated to providing quality healthcare.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden"
            >

              {/* Image */}
              <div className="bg-green-50 p-6 flex justify-center">
                <img
                  src={doctor.userId?.image}
                  alt="Doctor"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-gray-800">
                  {doctor.userId?.name}
                </h3>

                <p className="text-green-600 font-medium mt-2">
                  {doctor.specialization}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {doctor.hospital}
                </p>

                <p className="mt-3 font-semibold text-lg text-gray-800">
                  ₹{doctor.consultationFee}
                </p>

                <Link
                  to={`/doctors/${doctor._id}`}
                  className="mt-5 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition"
                >
                  View Profile
                </Link>

              </div>

            </div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center mt-14">

          <Link
            to="/doctors"
            className="inline-block border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition"
          >
            View All Doctors
          </Link>

        </div>

      </div>
    </section>
  );
};

export default FeaturedDoctors;