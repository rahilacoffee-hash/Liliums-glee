import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import AuthLayout from "./Authlayout"
import FormInput from "./Forminput"

function ForgotPasswordPage() {
  let navigate = useNavigate()
  let [email, setEmail] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await axiosInstance.put("/user/forgot-password", { email })
      navigate("/reset-password", { state: { email } })
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      activeTab="login"
      footer={
        <p className="text-center text-sm text-[#C6B8A8] mt-6">
          Remembered it? <Link to="/login" className="text-[#C9A46B] underline">Log in</Link>
        </p>
      }
    >
      <p className="text-sm text-[#C6B8A8] mb-5 -mt-2">
        We'll email you a code to reset your password.
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

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#F3ECE9] text-[#1c1712] font-medium hover:bg-[#e7ddd2] transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send code"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage