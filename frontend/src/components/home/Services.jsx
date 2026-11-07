import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaEye,
  FaStethoscope,
} from "react-icons/fa";

const services = [
  {
    icon: <FaHeartbeat className="text-5xl text-green-600" />,
    title: "Cardiology",
    description: "Heart specialists providing advanced cardiac care.",
  },
  {
    icon: <FaBrain className="text-5xl text-green-600" />,
    title: "Neurology",
    description: "Expert diagnosis and treatment for brain disorders.",
  },
  {
    icon: <FaBone className="text-5xl text-green-600" />,
    title: "Orthopaedics",
    description: "Specialized treatment for bones and joints.",
  },
  {
    icon: <FaBaby className="text-5xl text-green-600" />,
    title: "Paediatrics",
    description: "Complete healthcare for infants and children.",
  },
  {
    icon: <FaEye className="text-5xl text-green-600" />,
    title: "Ophthalmology",
    description: "Comprehensive eye care and vision treatment.",
  },
  {
    icon: <FaStethoscope className="text-5xl text-green-600" />,
    title: "General Medicine",
    description: "Routine check-ups and general health consultations.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Our <span className="text-green-600">Medical Services</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Access trusted healthcare services across multiple specialties,
            delivered by experienced medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;