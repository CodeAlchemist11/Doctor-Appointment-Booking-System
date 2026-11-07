import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoctor } from "../../services/adminService";
import AdminLayout from "../../components/admin/AdminLayout";

function AddDoctor() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    hospital: "",
    education: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doctorData = new FormData();

      Object.keys(formData).forEach((key) => {
        doctorData.append(key, formData[key]);
      });

      if (image) {
        doctorData.append("image", image);
      }

      await addDoctor(doctorData);

      alert("Doctor added successfully!");

      navigate("/admin/doctors");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Add Doctor
          </h1>
          <p className="mt-2 text-slate-500">
            Register a new doctor by filling in the information below.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* ================= Profile Image ================= */}

            <div>

              <h2 className="text-xl font-semibold text-slate-800 mb-5">
                Doctor Profile Image
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-6">

                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-dashed border-emerald-300 bg-slate-100 flex items-center justify-center shadow">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-center text-sm px-2">
                      Upload Image
                    </span>
                  )}

                </div>

                <div className="flex-1 w-full">

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Choose Profile Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm
                    file:mr-4
                    file:px-5
                    file:py-3
                    file:rounded-xl
                    file:border-0
                    file:bg-emerald-600
                    file:text-white
                    file:font-medium
                    hover:file:bg-emerald-700"
                  />

                </div>

              </div>

            </div>

            {/* ================= User Information ================= */}

            <div>

              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                User Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Doctor Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter doctor's full name"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@example.com"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Password <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter secure password"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

              </div>

            </div>

            {/* ================= Doctor Information ================= */}

            <div>

              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Professional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Specialization <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Cardiologist"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Experience (Years) <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Enter experience"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Consultation Fee (₹) <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="Enter consultation fee"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Hospital <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Hospital name"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-semibold">
                    Education <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. MBBS, MD (Cardiology)"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-semibold">
                    About Doctor <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="about"
                    rows="6"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Write a brief professional description..."
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  />
                </div>

              </div>

            </div>

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-emerald-700 hover:shadow-xl"
            >
              Add Doctor
            </button>

          </form>

        </div>

      </div>
    </div>
  </AdminLayout>
);
}

export default AddDoctor;