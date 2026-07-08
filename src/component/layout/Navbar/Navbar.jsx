import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Temporary State
  const isLoggedIn = false;
  const cartCount = 3;
  const user = {
    name: "Fred",
  };

  // Close the account dropdown when clicking anywhere outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 z-50 w-[94%] max-w-7xl -translate-x-1/2"
    >
      <nav className="flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-8 backdrop-blur-xl shadow-2xl">

        {/* Logo */}
         <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Liliums Glee"
            className="h-14 w-14 object-contain"
          />

          <div>
            <h1 className="font-serif text-2xl font-semibold text-white">
              Liliums Glee
            </h1>

            <p className="text-xs tracking-[4px] text-[#5d880e] uppercase">
              Interiors n Exteriors
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative pb-1 transition duration-300 ${
                    isActive
                      ? "text-[#D6A354]"
                      : "text-white hover:text-[#D6A354]"
                  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#D6A354] after:transition-all after:duration-300 ${
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

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white hover:text-[#D6A354] transition"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A354] text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 text-white hover:text-[#D6A354]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6A354] font-semibold text-black">
                  {user.name[0]}
                </div>

                <span>{user.name}</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
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
                  </div>

                  <Link
                    to="/profile"
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/saved-designs"
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Saved Designs
                  </Link>

                  <Link
                    to="/settings"
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Settings
                  </Link>

                  <button className="mt-2 w-full rounded-xl px-4 py-3 text-left text-red-400 hover:bg-red-500/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-[#D6A354]"
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

        {/* Mobile Menu */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          className="text-white lg:hidden"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
     <AnimatePresence>
  {mobileMenu && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={() => setMobileMenu(false)}
      />

      {/* Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed right-0 top-0 z-50 flex h-screen w-[92%] max-w-sm flex-col bg-[#0F1613] text-white shadow-2xl lg:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6 px-8 pt-10 pb-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Liliums Glee"
              className="h-11 w-11 object-contain"
            />

          <div>
            <h1 className="font-serif text-2xl font-semibold text-white">
              Liliums Glee
            </h1>

            <p className="text-xs tracking-[4px] text-[#5d880e] uppercase">
              Interiors n Exteriors
            </p>
          </div>
        </Link>

          <button onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X size={30} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-8 py-10">
          <ul className="space-y-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setMobileMenu(false)}
                  className="group flex items-center justify-between text-2xl font-light transition hover:text-[#D6A354]"
                >
                  <span>{link.name}</span>

                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-10 h-px bg-white/10" />

          {/* User */}
          {isLoggedIn ? (
            <div className="space-y-5">
              <Link
                to="/profile"
                className="flex items-center gap-3 text-lg"
              >
                <User size={22} />
                {user.name}
              </Link>

              <Link
                to="/orders"
                className="block text-gray-300"
              >
                Orders
              </Link>

              <Link
                to="/wishlist"
                className="block text-gray-300"
              >
                Wishlist
              </Link>

              <button className="text-red-400">
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 text-lg"
            >
              <User size={22} />
              Login
            </Link>
          )}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 p-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 p-4 hover:border-[#D6A354]"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag />

              <div>
                <p>Shopping Cart</p>

                <span className="text-sm text-gray-400">
                  {cartCount} Items
                </span>
              </div>
            </div>

            {cartCount > 0 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D6A354] font-semibold text-black">
                {cartCount}
              </div>
            )}
          </Link>

          {/* CTA */}
          <Link
            to="/contact"
            onClick={() => setMobileMenu(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#D6A354] py-4 font-semibold text-black transition hover:scale-[1.02]"
          >
            Get Consultation

            <ArrowRight size={18} />
          </Link>

          {/* Socials */}
          <div className="mt-8 flex justify-center gap-6 text-xs uppercase tracking-[3px] text-gray-500">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </motion.header>
  );
};

export default Navbar;