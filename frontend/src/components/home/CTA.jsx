import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-16 text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Ready to Book Your
            <span className="text-green-600"> Appointment?</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-8">
            Connect with experienced doctors and receive quality healthcare
            with a simple and secure online appointment booking process.
          </p>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-3 mt-10 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
          >
            Book Appointment
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default CTA;