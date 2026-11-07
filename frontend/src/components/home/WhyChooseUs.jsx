import {
  FaUserMd,
  FaCalendarCheck,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd size={40} className="text-green-600" />,
    title: "Expert Doctors",
    description:
      "Consult experienced and certified specialists across multiple departments.",
  },
  {
    icon: <FaCalendarCheck size={40} className="text-green-600" />,
    title: "Easy Appointment",
    description:
      "Book appointments online quickly without waiting in long queues.",
  },
  {
    icon: <FaShieldAlt size={40} className="text-green-600" />,
    title: "Secure Records",
    description:
      "Your personal and medical information remains safe and confidential.",
  },
  {
    icon: <FaHeadset size={40} className="text-green-600" />,
    title: "24/7 Support",
    description:
      "Our support team is available anytime to assist with your healthcare needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why <span className="text-green-600">Choose Us?</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We make healthcare simple, reliable, and accessible with trusted
            doctors and an easy online appointment system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;