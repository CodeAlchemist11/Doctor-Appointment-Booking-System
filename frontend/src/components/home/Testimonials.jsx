import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Das",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Booking an appointment was quick and simple. The doctor explained everything clearly and made me feel comfortable.",
  },
  {
    name: "Priya Sharma",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Excellent healthcare platform. The appointment process was smooth and I didn't have to wait long.",
  },
  {
    name: "Aman Patel",
    image: "https://i.pravatar.cc/150?img=58",
    review:
      "Professional doctors, friendly staff and a seamless booking experience. Highly recommended.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            What Our <span className="text-green-600">Patients Say</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Thousands of patients trust our platform for convenient and
            reliable healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border-4 border-green-200 object-cover"
                />
              </div>

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-center leading-7 italic">
                "{item.review}"
              </p>

              <h3 className="text-center mt-6 font-bold text-lg text-gray-800">
                {item.name}
              </h3>

              <p className="text-center text-green-600 text-sm">
                Patient
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;