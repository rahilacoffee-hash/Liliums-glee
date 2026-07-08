import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import AuthLayout from "./Authlayout"
import FormInput from "./Forminput"

function ResetPasswordPage() {
  let navigate = useNavigate()
  let location = useLocation()
  let [step, setStep] = useState("otp")
  let [email, setEmail] = useState(location.state?.email || "")
  let [otp, setOtp] = useState("")
  let [newPassword, setNewPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)

  async function handleVerifyOtp(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await axiosInstance.put("/user/verify-forgot-password-otp", { email, otp })
      setStep("password")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      await axiosInstance.put("/user/reset-password", { email, newPassword, confirmPassword })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title={step === "otp" ? "Enter Code" : "New Password"}
      activeTab="login"
      footer={
        <p className="text-center text-sm text-[#C6B8A8] mt-6">
          Back to <Link to="/login" className="text-[#C9A46B] underline">Log in</Link>
        </p>
      }
    >
      {step === "otp" ? (
        <form onSubmit={handleVerifyOtp}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          <FormInput
            label="OTP code"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
          />

          {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#F3ECE9] text-[#1c1712] font-medium hover:bg-[#e7ddd2] transition-colors disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <FormInput
            label="New password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <FormInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#F3ECE9] text-[#1c1712] font-medium hover:bg-[#e7ddd2] transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Reset password"}
          </button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ResetPasswordPage