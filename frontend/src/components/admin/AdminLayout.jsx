import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;