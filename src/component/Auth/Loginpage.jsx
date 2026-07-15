import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaXTwitter } from "react-icons/fa6"
import axiosInstance from "../../api/axiosInstance"
import { useAuth } from "../../context/AuthContext"
import AuthLayout from "./Authlayout"
import FormInput from "./Forminput"

function LoginPage() {
  let navigate = useNavigate()
  let { fetchUser } = useAuth()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      let { data } = await axiosInstance.post("/user/login", { email, password })

      // Refresh the shared auth state immediately - this is what makes
      // the Navbar (and anything else using useAuth) update right away
      // instead of still showing "Login" until a full page reload.
      await fetchUser()

      navigate(data.data?.role === "ADMIN" ? "/admin" : "/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Log In"
      activeTab="login"
      footer={
        <p className="text-center text-sm text-[#C6B8A8] mt-6">
          Don't have an account? <Link to="/register" className="text-[#C9A46B] underline">Sign up</Link>
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
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="text-right mb-5">
          <Link to="/forgot-password" className="text-xs text-[#C6B8A8] hover:text-[#C9A46B]">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#F3ECE9] text-[#1c1712] font-medium hover:bg-[#e7ddd2] transition-colors disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#C9A46B]/20" />
        <span className="text-xs text-[#C6B8A8]">OR</span>
        <div className="flex-1 h-px bg-[#C9A46B]/20" />
      </div>

      <div className="flex justify-center gap-4">
        <SocialButton icon={<FcGoogle size={18} />} />
        <SocialButton icon={<FaFacebook size={18} className="text-[#F3ECE9]" />} />
        <SocialButton icon={<FaXTwitter size={16} className="text-[#F3ECE9]" />} />
      </div>
    </AuthLayout>
  )
}

function SocialButton({ icon }) {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full bg-[#F3ECE9]/[0.08] border border-[#C9A46B]/20 flex items-center justify-center hover:bg-[#F3ECE9]/[0.14] transition-colors"
    >
      {icon}
    </button>
  )
}

export default LoginPage