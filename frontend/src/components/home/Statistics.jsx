import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUserMd className="text-5xl text-green-600" />,
    number: "100+",
    title: "Doctors",
  },
  {
    icon: <FaUsers className="text-5xl text-green-600" />,
    number: "10K+",
    title: "Happy Patients",
  },
  {
    icon: <FaCalendarCheck className="text-5xl text-green-600" />,
    number: "25K+",
    title: "Appointments",
  },
  {
    icon: <FaStar className="text-5xl text-yellow-500" />,
    number: "4.9",
    title: "Patient Rating",
  },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center text-white mb-14">
          <h2 className="text-4xl font-bold">
            Trusted by Thousands
          </h2>

          <p className="mt-4 text-green-100">
            Providing quality healthcare with experienced doctors and
            excellent patient care.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl text-center hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {stat.icon}
              </div>

              <h3 className="text-4xl font-bold text-gray-800">
                {stat.number}
              </h3>

              <p className="mt-2 text-gray-600 font-medium">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Statistics;