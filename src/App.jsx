import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./component/Auth/Loginpage"
import RegisterPage from "./component/Auth/Registerpage"
import VerifyOtpPage from "./component/Auth/Verifyotppage"
import ForgotPasswordPage from "./component/Auth/Forgotpasswordpage"
import ResetPasswordPage from "./component/Auth/Resetpasswordpage"
import Home from "./Pages/Home"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Add your real app routes below, e.g. */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App