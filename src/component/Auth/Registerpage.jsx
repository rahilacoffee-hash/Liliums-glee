import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

import axiosInstance from "../../api/axiosInstance";
import AuthLayout from "./Authlayout";
import FormInput from "./Forminput";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const [showAdminField, setShowAdminField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post("/user/register", form);

      console.log(data);

      navigate("/verify-otp", {
        state: {
          email: form.email,
        },
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Lilium Sglee and discover timeless luxury fashion."
      footer={
        <p className="text-center text-sm text-[#B7ACA2]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#C9A46B] hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      }
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FormInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />

        {showAdminField && (
          <FormInput
            label="Staff Code"
            name="adminCode"
            value={form.adminCode}
            onChange={handleChange}
            placeholder="Staff only"
          />
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-12 w-full rounded-xl bg-[#C9A46B] text-[#111] font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-[#d9b57c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <button
          type="button"
          onClick={() => setShowAdminField(!showAdminField)}
          className="mx-auto mt-4 block text-xs text-[#A89A8B] transition hover:text-[#C9A46B]"
        >
          {showAdminField
            ? "Hide Staff Registration"
            : "Staff Registration"}
        </button>
      </motion.form>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-white/10"></div>

        <span className="mx-4 text-xs uppercase tracking-[3px] text-[#A89A8B]">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SocialButton icon={<FcGoogle size={22} />} />

        <SocialButton
          icon={<FaFacebookF className="text-white" size={20} />}
        />

        <SocialButton
          icon={<FaXTwitter className="text-white" size={18} />}
        />
      </div>
    </AuthLayout>
  );
}

function SocialButton({ icon }) {
  return (
    <button
      type="button"
      className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#C9A46B] hover:bg-white/10"
    >
      {icon}
    </button>
  );
}

export default RegisterPage;