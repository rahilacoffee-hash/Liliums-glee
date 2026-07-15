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

import logo from "../../../assets/image/Logo/Logo.png";
import navLinks from "./navLinks";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();
  const { totalItems } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-1/2 top-3 z-50 w-[95%] max-w-7xl -translate-x-1/2 sm:top-5 sm:w-[94%]"
    >
      <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 shadow-2xl backdrop-blur-xl sm:h-18 sm:px-6 lg:h-20 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <img
            src={logo}
            alt="Liliums Glee"
            className="h-9 w-9 flex-shrink-0 object-contain sm:h-11 sm:w-11 lg:h-14 lg:w-14"
          />

          <div className="min-w-0">
            <h1 className="truncate font-serif text-base font-semibold text-white sm:text-xl lg:text-2xl">
              Liliums Glee
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
                  `relative pb-1 transition duration-300 ${
                    isActive
                      ? "text-[#D6A354]"
                      : "text-white hover:text-[#D6A354]"
                  } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#D6A354] after:transition-all after:duration-300 ${
                    isActive
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-6 xl:flex">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white transition hover:text-[#D6A354]"
          >
            <ShoppingBag size={22} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A354] text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>          {/* User */}
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />
          ) : isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 text-white transition hover:text-[#D6A354]"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#D6A354] font-semibold text-black">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>

                <ChevronDown
                  size={18}
                  className={`transition ${
                    dropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-4 w-60 rounded-2xl border border-white/10 bg-[#121212] p-2 shadow-xl">
                  <div className="border-b border-white/10 p-4">
                    <h3 className="font-semibold text-white">
                      Hi, {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdown(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setDropdown(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setDropdown(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/saved-designs"
                    onClick={() => setDropdown(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Saved Designs
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setDropdown(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white transition hover:text-[#D6A354]"
            >
              Login
            </Link>
          )}

          {/* CTA */}
          <Link
            to="/contact"
            className="group flex items-center gap-2 rounded-full bg-[#D6A354] px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Get Consultation

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile Trigger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-white xl:hidden"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>      {/* ================= Mobile Menu ================= */}

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col p-6">

              {/* Navigation */}

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 transition ${
                        isActive
                          ? "bg-[#D6A354] text-black"
                          : "text-white hover:bg-white/10"
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
                className="mt-6 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-white transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} />

                  <span>Shopping Cart</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"}
                  </span>

                  {totalItems > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D6A354] text-xs font-bold text-black">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>

              {/* User */}

              {loading ? (
                <div className="mt-6 h-12 animate-pulse rounded-xl bg-white/10" />
              ) : isLoggedIn ? (
                <>
                  <div className="mt-6 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#D6A354] font-bold text-black">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          user.name?.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div>
                        <h3 className="text-white font-semibold">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    className="mt-4 rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setMobileMenu(false)}
                    className="rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenu(false)}
                    className="rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                  >
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-3 rounded-xl bg-red-500/10 px-4 py-3 text-left text-red-400 transition hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="mt-6 rounded-full bg-[#D6A354] px-6 py-4 text-center font-semibold text-black transition hover:scale-105"
                >
                  Login
                </Link>
              )}

              {/* CTA */}

              <Link
                to="/contact"
                onClick={() => setMobileMenu(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#D6A354] px-6 py-4 font-semibold text-black transition hover:scale-105"
              >
                Get Consultation

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;