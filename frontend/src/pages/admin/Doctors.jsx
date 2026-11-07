import { useEffect, useState } from "react";
import {
    getAllDoctorsAdmin,
    deleteDoctorAdmin,
    searchDoctors,
} from "../../services/adminService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";


function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const fetchDoctors = async () => {
        try {
            const data = await getAllDoctorsAdmin();
            setDoctors(data.doctors);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleSearch = async () => {
        try {
            if (!keyword.trim()) {
                fetchDoctors();
                return;
            }

            const data = await searchDoctors(keyword);
            setDoctors(data.doctors);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDoctorAdmin(id);
            fetchDoctors();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Manage Doctors
            </h1>
            <p className="mt-2 text-slate-500">
              View, search, edit and manage all registered doctors.
            </p>
          </div>

          <Link
            to="/admin/doctors/add"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700"
          >
            + Add Doctor
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow">
          <div className="flex flex-col gap-4 lg:flex-row">

            <input
              type="text"
              placeholder="Search doctor..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />

            <button
              onClick={handleSearch}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={fetchDoctors}
              className="rounded-xl bg-slate-700 px-6 py-3 text-white hover:bg-slate-800"
            >
              Refresh
            </button>

          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl bg-white shadow-lg">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Specialization</th>
                <th className="px-6 py-4 text-left">Hospital</th>
                <th className="px-6 py-4 text-left">Fee</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {doctors.map((doctor) => (

                <tr
                  key={doctor._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-lg font-bold text-emerald-700">
                        {doctor.userId?.name?.charAt(0)}
                      </div>

                      <div>

                        <p className="font-semibold">
                          {doctor.userId?.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {doctor.userId?.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                      {doctor.specialization}
                    </span>
                  </td>

                  <td>{doctor.hospital}</td>

                  <td className="font-semibold text-emerald-600">
                    ₹{doctor.consultationFee}
                  </td>

                  <td>

                    {doctor.available ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                        Available
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                        Unavailable
                      </span>

                    )}

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/doctors/edit/${doctor._id}`)
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="grid gap-5 lg:hidden">

          {doctors.map((doctor) => (

            <div
              key={doctor._id}
              className="rounded-2xl bg-white p-5 shadow-lg"
            >

              <div className="flex items-center gap-4">

                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-xl font-bold text-emerald-700">
                  {doctor.userId?.name?.charAt(0)}
                </div>

                <div>

                  <h2 className="text-lg font-bold">
                    {doctor.userId?.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {doctor.userId?.email}
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">Specialization</span>
                  <span className="font-semibold">
                    {doctor.specialization}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Hospital</span>
                  <span>{doctor.hospital}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Fee</span>
                  <span className="font-semibold text-emerald-600">
                    ₹{doctor.consultationFee}
                  </span>
                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">Status</span>

                  {doctor.available ? (

                    <span className="text-green-600 font-semibold">
                      Available
                    </span>

                  ) : (

                    <span className="text-red-600 font-semibold">
                      Unavailable
                    </span>

                  )}

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() =>
                    navigate(`/admin/doctors/edit/${doctor._id}`)
                  }
                  className="flex-1 rounded-xl bg-blue-600 py-2 text-white hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="flex-1 rounded-xl bg-red-600 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  </AdminLayout>
);
}

export default Doctors;