import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDoctorByIdAdmin,
  updateDoctorAdmin,
} from "../../services/adminService";
import AdminLayout from "../../components/admin/AdminLayout";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    consultationFee: "",
    hospital: "",
    education: "",
    about: "",
  });

  const fetchDoctor = async () => {
    try {
      const data = await getDoctorByIdAdmin(id);

      setFormData({
        specialization: data.doctor.specialization || "",
        experience: data.doctor.experience || "",
        consultationFee: data.doctor.consultationFee || "",
        hospital: data.doctor.hospital || "",
        education: data.doctor.education || "",
        about: data.doctor.about || "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoctorAdmin(id, formData);

      alert("Doctor updated successfully!");

      navigate("/admin/doctors");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Edit Doctor
          </h1>
          <p className="mt-2 text-slate-500">
            Update the doctor's professional information.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Specialization */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Enter specialization"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Experience (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter experience"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

              {/* Consultation Fee */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Consultation Fee (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  placeholder="Enter consultation fee"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

              {/* Hospital */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Hospital <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

              {/* Education */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Education <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Enter education details"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  About Doctor <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="about"
                  rows="6"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Write a short description about the doctor..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  required
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                type="button"
                onClick={() => navigate("/admin/doctors")}
                className="flex-1 rounded-xl bg-slate-500 py-3 font-semibold text-white transition hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl"
              >
                Update Doctor
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  </AdminLayout>
);
}

export default EditDoctor;