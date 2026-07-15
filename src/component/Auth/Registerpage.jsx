import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "./Authlayout";
import FormInput from "./Forminput";
import PasswordRequirements from "./PasswordRequirements";

function RegisterPage() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post("/user/register", form);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    setError("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/user/google", {
        credential: credentialResponse.credential,
      });
      await fetchUser();
      navigate(data.data?.role === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="New Here?"
      title="Join the Liliums glee"
      subtitle="Create an account to begin your Liliums glee story."
      footer={
        <p className="text-center text-sm text-[#8C7F72]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C9A46B] hover:underline">Sign In</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <PasswordRequirements password={form.password} />

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
          <p className="text-xs text-[#C97A8A] mb-5 -mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#C9A46B] text-[#0E0E0E] font-medium tracking-[1px] transition-all duration-300 hover:bg-[#D9B57C] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <button
          type="button"
          onClick={() => setShowAdminField(!showAdminField)}
          className="mx-auto mt-5 block text-[10px] tracking-[2px] uppercase text-[#5A5148] hover:text-[#C9A46B] transition-colors"
        >
          {showAdminField ? "Hide staff registration" : "Staff registration"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[10px] tracking-[2px] uppercase text-[#8C7F72]">Or continue with</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <div className="flex justify-center [&>div]:!w-full mb-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google sign-up failed")}
          theme="filled_black"
          shape="pill"
          width="320"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton icon={<FaFacebookF className="text-[#F3ECE9]" size={16} />} />
        <SocialButton icon={<FaXTwitter className="text-[#F3ECE9]" size={15} />} />
      </div>
    </AuthLayout>
  );
}

function SocialButton({ icon }) {
  return (
    <button
      type="button"
      className="h-11 flex items-center justify-center border border-white/10 hover:border-[#C9A46B]/50 hover:bg-white/[0.03] transition-colors"
    >
      {icon}
    </button>
  );
}

export default RegisterPage;