import { Link } from "react-router-dom";
import doctorHero from "../../assets/images/doctor-hero.jpeg";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">

            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold shadow-sm mb-5">
              🌿 Trusted Healthcare Platform
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Find the Right Doctor
              <br />
              and
              <span className="text-green-600"> Book Instantly</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Book appointments with experienced doctors anytime,
              anywhere. Enjoy fast, secure and hassle-free healthcare
              from the comfort of your home.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <Link
                to="/doctors"
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
              >
                Book Appointment
              </Link>

              <Link
                to="/doctors"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white hover:scale-105 transition duration-300"
              >
                Find Doctors
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-10">

              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">100+</h3>
                <p className="text-gray-600 mt-1">Doctors</p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">10K+</h3>
                <p className="text-gray-600 mt-1">Happy Patients</p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">24/7</h3>
                <p className="text-gray-600 mt-1">Support</p>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center relative">

            {/* Background Glow */}
            <div className="absolute w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30"></div>

            {/* Image Card */}
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-green-100 hover:scale-105 transition duration-500">

              <img
                src={doctorHero}
                alt="Doctor"
                className="w-full max-w-md rounded-3xl object-cover"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;