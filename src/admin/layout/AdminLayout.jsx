import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] text-sm text-[#777]">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // AdminSidebar renders its own backdrop + animation for the mobile
  // overlay now, so this layout no longer needs a second one stacked on top

  return (
    <div className="min-h-screen bg-[#F8F5F0]">

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Section - left margin matches the floating sidebar's
          current width (296px expanded / 96px expanded) plus its 16px
          offset from the edge, so content never sits under it or leaves
          an awkward gap */}
      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ${
          collapsed ? "lg:ml-[112px]" : "lg:ml-[312px]"
        }`}
      >
        {/* Navbar */}
        <AdminNavbar>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2D9] bg-white transition hover:border-[#C8A96A] hover:text-[#C8A96A] lg:hidden"
          >
            <Menu size={20} />
          </button>
        </AdminNavbar>

        {/* Content */}
        <main className="min-w-0 flex-1 px-3 pb-5 sm:px-4 md:px-6 md:pb-8">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;