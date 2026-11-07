import { useEffect, useState } from "react";
import { getDashboard } from "../../services/adminService";
import AdminLayout from "../../components/admin/AdminLayout";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data.dashboard);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
  return (
    <AdminLayout>
      <div className="p-6 text-center">
        Loading Dashboard...
      </div>
    </AdminLayout>
  );
}

  const cards = [
  {
    title: "Patients",
    value: dashboard.totalPatients,
    color: "from-sky-500 to-cyan-400",
    bg: "bg-sky-100",
    text: "text-sky-600",
    icon: "👤",
  },
  {
    title: "Doctors",
    value: dashboard.totalDoctors,
    color: "from-emerald-500 to-green-400",
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    icon: "🩺",
  },
  {
    title: "Appointments",
    value: dashboard.totalAppointments,
    color: "from-violet-500 to-fuchsia-400",
    bg: "bg-violet-100",
    text: "text-violet-600",
    icon: "📅",
  },
  {
    title: "Pending",
    value: dashboard.pendingAppointments,
    color: "from-amber-500 to-yellow-400",
    bg: "bg-amber-100",
    text: "text-amber-600",
    icon: "⏳",
  },
  {
    title: "Confirmed",
    value: dashboard.confirmedAppointments,
    color: "from-blue-500 to-indigo-400",
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: "✅",
  },
  {
    title: "Completed",
    value: dashboard.completedAppointments,
    color: "from-green-500 to-lime-400",
    bg: "bg-green-100",
    text: "text-green-600",
    icon: "✔️",
  },
  {
    title: "Cancelled",
    value: dashboard.cancelledAppointments,
    color: "from-red-500 to-rose-400",
    bg: "bg-red-100",
    text: "text-red-600",
    icon: "❌",
  },
];

  return (
  <AdminLayout>
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Welcome back! Here's an overview of your system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
  key={card.title}
  className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
  {/* Gradient Top Bar */}
  <div
    className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${card.color}`}
  />

  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
        {card.title}
      </p>

      <h2 className="mt-3 text-4xl font-extrabold text-slate-800">
        {card.value}
      </h2>
    </div>

    <div
      className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl ${card.bg} ${card.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
    >
      {card.icon}
    </div>
  </div>

  <div className="mt-6 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
    <div
      className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
      style={{ width: "70%" }}
    />
  </div>
</div>
          ))}
        </div>
      </div>
    </div>
  </AdminLayout>
);
}

export default Dashboard;