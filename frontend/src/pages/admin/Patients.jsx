import { useEffect, useState } from "react";
import {
  getAllPatients,
  deletePatient,
  searchPatients,
} from "../../services/adminService";
import AdminLayout from "../../components/admin/AdminLayout";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data.patients);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) {
        fetchPatients();
        return;
      }

      const data = await searchPatients(keyword);
      setPatients(data.patients);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Manage Patients
          </h1>
          <p className="mt-2 text-slate-500">
            Search, view and manage all registered patients.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Search patient by name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <button
              onClick={handleSearch}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={fetchPatients}
              className="rounded-xl bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Refresh
            </button>

          </div>
        </div>

        {/* ================= Desktop Table ================= */}

        <div className="hidden lg:block overflow-hidden rounded-2xl bg-white shadow-xl">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr className="text-left text-sm uppercase tracking-wider text-slate-600">

                <th className="px-6 py-4">Patient</th>

                <th className="px-6 py-4">Email</th>

                <th className="px-6 py-4">Phone</th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {patients.map((patient) => (

                <tr
                  key={patient._id}
                  className="border-t transition hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-lg text-emerald-700">
                        {patient.name?.charAt(0)}
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {patient.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          Patient
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {patient.email}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {patient.phone}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
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

        {/* ================= Mobile Cards ================= */}

        <div className="grid gap-5 lg:hidden">

          {patients.map((patient) => (

            <div
              key={patient._id}
              className="rounded-2xl bg-white p-5 shadow-lg"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                  {patient.name?.charAt(0)}
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-800">
                    {patient.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Registered Patient
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Email
                  </span>

                  <span className="font-medium break-all text-right">
                    {patient.email}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Phone
                  </span>

                  <span className="font-medium">
                    {patient.phone}
                  </span>

                </div>

              </div>

              <button
                onClick={() => handleDelete(patient._id)}
                className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Delete Patient
              </button>

            </div>

          ))}

        </div>

        {/* Empty State */}

        {patients.length === 0 && (

          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">

            <div className="text-6xl mb-4">
              👥
            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              No Patients Found
            </h2>

            <p className="mt-2 text-slate-500">
              Try searching with another keyword or refresh the list.
            </p>

          </div>

        )}

      </div>
    </div>
  </AdminLayout>
);
}

export default Patients;