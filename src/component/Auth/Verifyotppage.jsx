import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import AuthLayout from "./Authlayout"
import FormInput from "./Forminput"

function VerifyOtpPage() {
  let navigate = useNavigate()
  let location = useLocation()
  let [email, setEmail] = useState(location.state?.email || "")
  let [otp, setOtp] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await axiosInstance.post("/user/verify-email", { email, otp })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Verify Email"
      activeTab="signup"
      footer={
        <p className="text-center text-sm text-[#C6B8A8] mt-6">
          Wrong email? <Link to="/register" className="text-[#C9A46B] underline">Go back</Link>
        </p>
      }
    >
      <p className="text-sm text-[#C6B8A8] mb-5 -mt-2">
        Enter the 6-digit code we sent to your email.
      </p>

      <form onSubmit={handleSubmit}>
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
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default VerifyOtpPage