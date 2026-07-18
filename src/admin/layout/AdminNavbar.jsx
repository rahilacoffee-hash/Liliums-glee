import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

function AdminNavbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [dropdown, setDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        const { data } = await axiosInstance.get("/notification/unread-count");
        setUnreadCount(data.data.unreadCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUnreadCount();
    // Poll every 30s so the badge stays reasonably fresh without a websocket
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await logout();
    setDropdown(false);
    navigate("/login");
  }

  const pageTitle =
    location.pathname === "/admin"
      ? "Dashboard"
      : location.pathname
          .split("/")
          .pop()
          .replace("-", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <header className="sticky top-4 z-30 mx-4 mb-4 rounded-[24px] border border-[#E8E2D9] bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-5 md:px-8">

        {/* Left */}
        <div className="flex items-center gap-5">
          {children}

          <div>
            <h1 className="font-serif text-2xl text-[#111111]">{pageTitle}</h1>
            <p className="text-sm text-[#999]">Welcome back 👋</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-64 rounded-full border border-[#E8E2D9] bg-[#F8F5F0] pl-11 pr-4 text-sm outline-none transition focus:border-[#C8A96A] focus:bg-white"
            />
          </div>

          {/* Notifications */}
          <Link
            to="/admin/notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2D9] bg-white transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C8A96A] px-1 text-[10px] font-bold text-black">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-3 rounded-full border border-[#E8E2D9] bg-white py-1.5 pl-1.5 pr-3 transition hover:border-[#C8A96A]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#C8A96A] to-[#B8925A] font-serif font-semibold text-black">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-[#111111]">{user?.name || "Admin"}</p>
                <span className="text-xs text-[#999]">{user?.role || "Administrator"}</span>
              </div>

              <ChevronDown size={16} className={`text-[#999] transition-transform ${dropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                >
                  <div className="border-b border-[#E8E2D9] bg-[#F8F5F0] p-5">
                    <h3 className="font-serif text-[#111111]">{user?.name}</h3>
                    <p className="mt-1 text-sm text-[#999]">{user?.email}</p>
                  </div>

                  <Link to="/admin/profile" onClick={() => setDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-[#111111] transition hover:bg-[#F8F5F0]">
                    <User size={17} className="text-[#C8A96A]" />
                    Profile
                  </Link>

                  <Link to="/admin/settings" onClick={() => setDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-[#111111] transition hover:bg-[#F8F5F0]">
                    <Settings size={17} className="text-[#C8A96A]" />
                    Settings
                  </Link>

                  <button onClick={handleLogout} className="flex w-full items-center gap-3 border-t border-[#E8E2D9] px-5 py-3 text-red-500 transition hover:bg-red-50">
                    <LogOut size={17} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;