import {
  FaSearch,
  FaCalendarCheck,
  FaUserMd,
  FaHeartbeat,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-5xl text-green-600" />,
    title: "Find a Doctor",
    description:
      "Search experienced specialists based on your healthcare needs.",
  },
  {
    icon: <FaCalendarCheck className="text-5xl text-green-600" />,
    title: "Book Appointment",
    description:
      "Select your preferred date and time in just a few clicks.",
  },
  {
    icon: <FaUserMd className="text-5xl text-green-600" />,
    title: "Consult Doctor",
    description:
      "Visit the clinic and receive expert medical consultation.",
  },
  {
    icon: <FaHeartbeat className="text-5xl text-green-600" />,
    title: "Get Better",
    description:
      "Follow the prescribed treatment and stay healthy.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            How <span className="text-green-600">It Works</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Booking a doctor's appointment is simple, quick and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>

              <div className="mt-6 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mt-6">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;