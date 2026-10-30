import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./component/layout/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import LuxuryLoader from "./component/layout/Loader/LuxuryLoader";

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Services = lazy(() => import("./Pages/Services"));
const Collections = lazy(() => import("./Pages/Collections"));
const Gallery = lazy(() => import("./Pages/Gallery"));
const ProjectDetails = lazy(() => import("./Pages/ProjectDetails"));
const ProductDetailsPage = lazy(() => import("./component/collectionspage/Productdetailspage"));
const Contact = lazy(() => import("./Pages/Contact"));
const Profile = lazy(() => import("./Pages/Profile"));
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const SavedDesigns = lazy(() => import("./Pages/SavedDesigns"));
const Legal = lazy(() => import("./Pages/Legal"));
const Marketplace = lazy(() => import("./Pages/Marketplace"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const PaymentSuccess = lazy(() => import("./Pages/PaymentSuccess"));
const MyOrders = lazy(() => import("./Pages/Myorders"));
const OrderDetail = lazy(() => import("./component/Orderdetail"));
const ConsultationPaymentCallback = lazy(() => import("./Pages/Consultationpaymentcallback"));
const LoginPage = lazy(() => import("./component/Auth/Loginpage"));
const RegisterPage = lazy(() => import("./component/Auth/Registerpage"));
const VerifyOtpPage = lazy(() => import("./component/Auth/Verifyotppage"));
const ForgotPasswordPage = lazy(() => import("./component/Auth/Forgotpasswordpage"));
const ResetPasswordPage = lazy(() => import("./component/Auth/Resetpasswordpage"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./admin/dashboard/Dashboard"));
const Products = lazy(() => import("./admin/products/Products"));
const AddProduct = lazy(() => import("./admin/products/AddProduct"));
const EditProduct = lazy(() => import("./admin/products/EditProduct"));
const Orders = lazy(() => import("./admin/orders/Orders"));
const OrderDetails = lazy(() => import("./admin/orders/Orderdetails"));
const Users = lazy(() => import("./admin/users/Users"));
const Reviews = lazy(() => import("./admin/reviews/Reviews"));
const Consultations = lazy(() => import("./admin/consultation/Consultations"));
const ConsultationDetails = lazy(() => import("./admin/consultation/Consultationdetails"));
const Settings = lazy(() => import("./admin/settings/Settings"));
const SiteContentEditor = lazy(() => import("./admin/components/Sitecontenteditor"));
const Testimonials = lazy(() => import("./admin/components/Testimonials"));
const NotificationsPage = lazy(() => import("./Pages/Notificationspage"));
const Projects = lazy(() => import("./admin/components/Projects"));
const Servicess = lazy(() => import("./admin/components/Services"));

function App() {

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1800);

  return () => clearTimeout(timer);
}, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />



      {loading && <LuxuryLoader />}



      {!loading && (
      

        <Suspense fallback={<LuxuryLoader />}>
        <Routes>
          {/* ================= Public Pages ================= */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/saved-designs" element={<SavedDesigns />} />
          <Route path="/shop" element={<Collections />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* Keep previously shared URLs working while the public catalogue
              and project pages use the routes above. */}
          <Route path="/collections" element={<Navigate to="/shop" replace />} />
          <Route path="/projects" element={<Navigate to="/gallery" replace />} />
          <Route path="/shop/:slug" element={<ProductDetailsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<ProjectDetails />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
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
         <Route path="settings" element={<Settings />} />
         <Route path="content" element={<SiteContentEditor />} />
<Route path="testimonials" element={<Testimonials />} />
<Route path="notifications" element={<NotificationsPage />} />
<Route path="services" element={<Servicess />} />  {/* admin */}
<Route path="projects" element={<Projects />} />  {/* admin */}
         
          </Route>
          <Route path="/admin/profile" element={<Navigate to="/profile" replace />} />

  <Route path="/orders" element={<MyOrders />} />
  <Route path="/orders/:id" element={<OrderDetail />} />
  <Route path="/consultation-payment-callback" element={<ConsultationPaymentCallback />} />

          {/* ================= 404 ================= */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
        )}

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
