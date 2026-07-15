import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
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
      await fetchUser()
      navigate(data.data?.role === "ADMIN" ? "/admin" : "/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    setError("")
    setLoading(true)

    try {
      let { data } = await axiosInstance.post("/user/google", {
        credential: credentialResponse.credential,
      })
      await fetchUser()
      navigate(data.data?.role === "ADMIN" ? "/admin" : "/")
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Member Access"
      title="Welcome back"
      subtitle="Sign in to continue your journey with us."
      footer={
        <p className="text-center text-sm text-[#8C7F72]">
          New here? <Link to="/register" className="text-[#C9A46B] hover:underline">Create an account</Link>
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

        <div className="text-right -mt-3 mb-8">
          <Link to="/forgot-password" className="text-xs text-[#8C7F72] hover:text-[#C9A46B] transition-colors">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-xs text-[#C97A8A] mb-5">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#C9A46B] text-[#0E0E0E] font-medium tracking-[1px] transition-all duration-300 hover:bg-[#D9B57C] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
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
          onError={() => setError("Google sign-in failed")}
          theme="filled_black"
          shape="pill"
          width="320"
        />
      </div>

      <div className="flex justify-center gap-4">
        <SocialButton icon={<FaFacebook size={17} className="text-[#F3ECE9]" />} />
        <SocialButton icon={<FaXTwitter size={15} className="text-[#F3ECE9]" />} />
      </div>
    </AuthLayout>
  )
}

function SocialButton({ icon }) {
  return (
    <button
      type="button"
      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9A46B]/50 hover:bg-white/[0.03] transition-colors"
    >
      {icon}
    </button>
  )
}

export default LoginPage