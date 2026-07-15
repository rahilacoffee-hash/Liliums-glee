import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

function AdminNavbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axiosInstance.get("/user/user-details");

        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    try {
      await axiosInstance.get("/user/logout");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
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
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-20 items-center justify-between px-5 md:px-8">

        {/* Left */}
        <div className="flex items-center gap-5">

          {children}

          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {pageTitle}
            </h1>

            <p className="text-sm text-gray-500">
              Welcome back 👋
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                h-11
                w-72
                rounded-xl
                border
                border-gray-200
                bg-[#F8F9FA]
                pl-11
                pr-4
                outline-none
                transition
                focus:border-[#C8A96A]
              "
            />
          </div>

          {/* Notifications */}
          <button
            className="
              relative
              rounded-xl
              border
              border-gray-200
              bg-white
              p-3
              transition
              hover:bg-gray-100
            "
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdown(!dropdown)}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-2
                transition
                hover:bg-gray-100
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C8A96A]
                  font-semibold
                  text-black
                "
              >
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>

              <div className="hidden text-left md:block">
                <p className="font-medium text-[#111827]">
                  {user?.name || "Admin"}
                </p>

                <span className="text-sm text-gray-500">
                  {user?.role || "Administrator"}
                </span>
              </div>

              <ChevronDown size={18} />
            </button>

            {dropdown && (
              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-xl
                "
              >
                <div className="border-b border-gray-100 p-5">
                  <h3 className="font-semibold text-[#111827]">
                    {user?.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <Link
                  to="/admin/profile"
                  className="
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    transition
                    hover:bg-gray-100
                  "
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  to="/admin/settings"
                  className="
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    transition
                    hover:bg-gray-100
                  "
                >
                  <Settings size={18} />
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-5
                    py-3
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;