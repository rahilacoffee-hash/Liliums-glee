import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./component/Auth/Loginpage";
import RegisterPage from "./component/Auth/Registerpage";
import VerifyOtpPage from "./component/Auth/Verifyotppage";
import ForgotPasswordPage from "./component/Auth/Forgotpasswordpage";
import ResetPasswordPage from "./component/Auth/Resetpasswordpage";

import ScrollToTop from "./component/layout/ScrollToTop";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Collections from "./Pages/Collections";
import ProductDetailsPage from "./component/collectionspage/Productdetailspage";
import Contact from "./Pages/Contact";

import { AuthProvider } from "./context/AuthContext";

import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/dashboard/Dashboard";
import Products from "./admin/products/Products";
import AddProduct from "./admin/products/AddProduct";
import EditProduct from "./admin/products/EditProduct";
import MyOrders from "./Pages/Myorders";
import Orders from "./admin/orders/Orders";
import OrderDetails from "./admin/orders/Orderdetails";
import OrderDetail from "./component/Orderdetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Users from "./admin/users/Users";
import Reviews from "./admin/reviews/Reviews";
import Consultations from "./admin/consultation/Consultations";
import ConsultationDetails from "./admin/consultation/Consultationdetails";
import ConsultationPaymentCallback from "./Pages/Consultationpaymentcallback";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* ================= Public Pages ================= */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Collections />} />
          <Route path="/shop/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} /> 
           <Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

          {/* ================= Authentication ================= */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* ================= Admin ================= */}

          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
<Route path="orders/:id" element={<OrderDetails />} />

         <Route path="users" element={<Users />} />
         <Route path="reviews" element={<Reviews />} />
         <Route path="consultations" element={<Consultations />} />
         <Route path="consultations/:id" element={<ConsultationDetails />} />
         
          </Route>

  <Route path="/orders" element={<MyOrders />} />
  <Route path="/consultation-payment-callback" element={<ConsultationPaymentCallback />} />

          {/* ================= 404 ================= */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;