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
      eyebrow="One Step Left"
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent you."
      footer={
        <p className="text-center text-sm text-[#8C7F72]">
          Wrong email? <Link to="/register" className="text-[#C9A46B] hover:underline">Go back</Link>
        </p>
      }
    >
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
          label="Verification Code"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
        />

        {error && <p className="text-xs text-[#C97A8A] mb-5 -mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#C9A46B] text-[#0E0E0E] font-medium tracking-[1px] transition-all duration-300 hover:bg-[#D9B57C] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default VerifyOtpPage