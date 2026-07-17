import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  X,
  Image,
  Star,
} from "lucide-react";

import logo from "../../assets/image/Logo/Logo.png";
import axiosInstance from "../../api/axiosInstance";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    name: "Reviews",
    icon: MessageSquare,
    path: "/admin/reviews",
  },
  {
    name: "Consultations",
    icon: CalendarDays,
    path: "/admin/consultations",
  },
  {
    name: "Testimonials",
    icon: Star,
    path: "/admin/testimonials",
  },
  {
    name: "Homepage Content",
    icon: Image,
    path: "/admin/content",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axiosInstance.get("/user/logout");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        z-50
        h-screen
        w-72
        bg-[#0F172A]
        text-white
        transition-transform
        duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div>
            <h2 className="font-serif text-xl font-semibold">
              Liliums Glee
            </h2>

            <p className="text-xs uppercase tracking-[3px] text-gray-400">
              Admin Panel
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2 overflow-y-auto px-4 pb-24" style={{ maxHeight: "calc(100vh - 96px)" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#C8A96A] text-black shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={21} />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="absolute bottom-0 w-full border-t border-white/10 bg-[#0F172A] p-4">
        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            bg-red-500/10
            px-4
            py-3
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;