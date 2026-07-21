import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  User,
} from "lucide-react";

import staticLogo from "../../../assets/image/Logo/Logo.png";
import navLinks from "./navLinks";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import axiosInstance from "../../../api/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();
  const { totalItems } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [settings, setSettings] = useState(null);

  const dropdownRef = useRef(null);
  const isLoggedIn = !!user;

  // Pull the logo + site name from Settings so changing them in the admin
  // panel actually reflects here, instead of a hardcoded image/string
  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await axiosInstance.get("/settings");
        if (data.success) setSettings(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSettings();
  }, []);

  const logoSrc = settings?.logo || staticLogo;
  const siteName = settings?.siteName || "Liliums Glee";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setDropdown(false);
    navigate("/login");
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-3 z-50 w-[95%] max-w-7xl -translate-x-1/2 sm:top-5 sm:w-[94%]"
    >
      <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 shadow-2xl backdrop-blur-xl sm:h-[72px] sm:px-6 lg:h-20 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={logoSrc}
            alt={siteName}
            className="h-9 w-9 flex-shrink-0 rounded-lg object-contain sm:h-11 sm:w-11 lg:h-14 lg:w-14"
          />

          <div className="min-w-0">
            <h1 className="truncate font-serif text-base font-semibold text-white sm:text-xl lg:text-2xl">
              {siteName}
            </h1>

            <p className="hidden truncate text-[9px] uppercase tracking-[2px] text-[#5d880e] sm:block sm:text-xs sm:tracking-[3px] lg:tracking-[4px]">
              Interiors n Exteriors
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 xl:flex xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative whitespace-nowrap pb-1 transition duration-300 ${
                    isActive ? "text-[#D6A354]" : "text-white hover:text-[#D6A354]"
                  } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#D6A354] after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-4 xl:flex xl:gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative flex-shrink-0 text-white transition hover:text-[#D6A354]">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A354] text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User */}
          {loading ? (
            <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-white/10" />
          ) : isLoggedIn ? (
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 text-white transition hover:text-[#D6A354]"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#D6A354] font-semibold text-black">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>
                <ChevronDown size={18} className={`transition ${dropdown ? "rotate-180" : ""}`} />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-4 w-60 rounded-2xl border border-white/10 bg-[#121212] p-2 shadow-xl">
                  <div className="border-b border-white/10 p-4">
                    <h3 className="font-semibold text-white">Hi, {user.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{user.email}</p>
                  </div>

                  <Link to="/profile" onClick={() => setDropdown(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setDropdown(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">
                    Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setDropdown(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">
                    Wishlist
                  </Link>
                  <Link to="/saved-designs" onClick={() => setDropdown(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">
                    Saved Designs
                  </Link>
                  <Link to="/settings" onClick={() => setDropdown(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">
                    Settings
                  </Link>

                  <button onClick={handleLogout} className="mt-2 w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex-shrink-0 whitespace-nowrap text-white transition hover:text-[#D6A354]">
              Login
            </Link>
          )}

          {/* CTA */}
          <Link
            to="/contact"
            className="group flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#D6A354] px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Get Consultation
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Trigger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex-shrink-0 text-white xl:hidden"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
        >
          {mobileMenu ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
        </button>
      </nav>

      {/* ================= Mobile Menu ================= */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="mt-3 max-h-[80vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col p-4 sm:p-6">

              {/* Navigation */}
              <div className="space-y-1.5 sm:space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-2.5 text-sm transition sm:py-3 sm:text-base ${
                        isActive ? "bg-[#D6A354] text-black" : "text-white hover:bg-white/10"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMobileMenu(false)}
                className="mt-5 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/10 sm:mt-6 sm:text-base"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={19} className="sm:h-5 sm:w-5" />
                  <span>Shopping Cart</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xs text-gray-400 sm:text-sm">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"}
                  </span>
                  {totalItems > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A354] text-[11px] font-bold text-black sm:h-6 sm:w-6 sm:text-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>

              {/* User */}
              {loading ? (
                <div className="mt-5 h-12 animate-pulse rounded-xl bg-white/10 sm:mt-6" />
              ) : isLoggedIn ? (
                <>
                  <div className="mt-5 rounded-2xl border border-white/10 p-3.5 sm:mt-6 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D6A354] font-bold text-black sm:h-12 sm:w-12">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          user.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-white sm:text-base">{user.name}</h3>
                        <p className="truncate text-xs text-gray-400 sm:text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/profile" onClick={() => setMobileMenu(false)} className="mt-3 rounded-xl px-4 py-2.5 text-sm text-white transition hover:bg-white/10 sm:mt-4 sm:py-3 sm:text-base">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMobileMenu(false)} className="rounded-xl px-4 py-2.5 text-sm text-white transition hover:bg-white/10 sm:py-3 sm:text-base">
                    My Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setMobileMenu(false)} className="rounded-xl px-4 py-2.5 text-sm text-white transition hover:bg-white/10 sm:py-3 sm:text-base">
                    Wishlist
                  </Link>

                  <button onClick={handleLogout} className="mt-2.5 rounded-xl bg-red-500/10 px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/20 sm:mt-3 sm:py-3 sm:text-base">
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="mt-5 rounded-full bg-[#D6A354] px-6 py-3.5 text-center text-sm font-semibold text-black transition hover:scale-105 sm:mt-6 sm:py-4 sm:text-base"
                >
                  Login
                </Link>
              )}

              {/* CTA */}
              <Link
                to="/contact"
                onClick={() => setMobileMenu(false)}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#D6A354] px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-105 sm:mt-6 sm:py-4 sm:text-base"
              >
                Get Consultation
                <ArrowRight size={17} className="sm:h-[18px] sm:w-[18px]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;