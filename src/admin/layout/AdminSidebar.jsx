import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import logo from "../../assets/image/Logo/Logo.png";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const menuGroups = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/admin" }],
  },
  {
    label: "Catalog",
    items: [
      { name: "Products", icon: Package, path: "/admin/products" },
      { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
      { name: "Reviews", icon: MessageSquare, path: "/admin/reviews" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { name: "Users", icon: Users, path: "/admin/users" },
      { name: "Consultations", icon: CalendarDays, path: "/admin/consultations" },
      { name: "Testimonials", icon: Star, path: "/admin/testimonials" },
    ],
  },
  {
    label: "Site",
    items: [
      { name: "Homepage Content", icon: Image, path: "/admin/content" },
      { name: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
];

function AdminSidebar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await axiosInstance.get("/user/logout");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: collapsed ? 96 : 296 }}
        className={`
          fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] flex-col
          rounded-[28px] border border-white/10
          bg-gradient-to-b from-[#1c1712] to-[#0F0C09]
          shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          transition-[width] duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)] lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Logo" className="h-11 w-11 flex-shrink-0 rounded-xl object-cover ring-2 ring-[#C8A96A]/30" />

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <h2 className="whitespace-nowrap font-serif text-lg font-semibold text-white">Liliums Glee</h2>
                  <p className="whitespace-nowrap text-[10px] uppercase tracking-[3px] text-[#C8A96A]">Admin Panel</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="flex-shrink-0 text-white/60 hover:text-white lg:hidden">
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-6 [scrollbar-width:thin]">
          {menuGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-white/30">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={() => setSidebarOpen(false)}
                      title={collapsed ? item.name : undefined}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-[#C8A96A] to-[#B8925A] text-black shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        } ${collapsed ? "justify-center" : ""}`
                      }
                    >
                      <Icon size={19} className="flex-shrink-0" />

                      {!collapsed && <span className="whitespace-nowrap font-medium">{item.name}</span>}

                      {/* Tooltip when collapsed */}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#1c1712] px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="hidden items-center justify-center gap-2 border-t border-white/10 py-3 text-xs text-white/40 transition hover:text-[#C8A96A] lg:flex"
        >
          {collapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /> Collapse</>}
        </button>

        {/* User + Logout */}
        <div className="space-y-3 border-t border-white/10 p-3">
          {!collapsed && user && (
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#C8A96A] font-serif text-sm font-semibold text-black">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-xs text-white/40">{user.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center gap-3 rounded-2xl bg-red-500/10 px-3 py-3 text-red-400 transition hover:bg-red-500 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={19} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default AdminSidebar;