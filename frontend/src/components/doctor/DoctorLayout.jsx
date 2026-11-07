import Sidebar from "./Sidebar";

function DoctorLayout({ children }) {
  return (
    <div className="flex">
    <Sidebar />

    <main className="ml-64 flex-1 p-6 min-h-screen bg-gray-50">
        {children}
    </main>
</div>
  );
}

export default DoctorLayout;