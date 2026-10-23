import { Link, useLocation } from "react-router-dom";
import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";

function Legal() {
  const isPrivacy = useLocation().pathname === "/privacy-policy";
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
  const copy = isPrivacy
    ? "We use your contact and order information only to provide our services, fulfil purchases, and support your account."
    : "By using Liliums Glee, you agree to provide accurate information for consultations and orders and to use the site lawfully.";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FCFAF7] px-6 pb-20 pt-36 sm:px-8">
        <article className="mx-auto max-w-3xl rounded-3xl border border-[#E8E2D9] bg-white p-7 sm:p-10 md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#C8A96A]">Liliums Glee</p>
          <h1 className="mt-4 font-serif text-4xl text-[#1C1512] sm:text-5xl">{title}</h1>
          <p className="mt-8 text-base leading-8 text-[#665A51]">{copy}</p>
          <p className="mt-5 text-base leading-8 text-[#665A51]">For questions about this policy, please contact our team and we will be happy to assist.</p>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-[#1C1512] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C8A96A] hover:text-black">Contact us</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default Legal;
