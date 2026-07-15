import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Section */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* Navbar */}
        <AdminNavbar>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </AdminNavbar>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;