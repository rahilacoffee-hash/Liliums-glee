import AIChat from "../component/AIChat";
import Footer from "../component/layout/Footer/Footer";
import Navbar from "../component/layout/Navbar/Navbar";
import OurExpertise from "../component/servicespage/OurExpertise";
import ServicesCTA from "../component/servicespage/ServicesCTA";
import ServicesFAQ from "../component/servicespage/ServicesFAQ";
import ServicesGrid from "../component/servicespage/ServicesGrid";
import ServicesHero from "../component/servicespage/ServicesHero";
import WhyChooseServices from "../component/servicespage/WhyChooseServices";


function Services() {
  return (
    <>
      {/* ================= Navbar ================= */}

      <Navbar />

      {/* ================= Hero ================= */}

      <ServicesHero />

      {/* ================= Services ================= */}

      {/* <ServicesGrid /> */}

      {/* ================= Our Expertise ================= */}

      <OurExpertise />

      {/* ================= Why Choose Us ================= */}

      <WhyChooseServices />

      {/* ================= FAQ ================= */}

      <ServicesFAQ />

      {/* ================= CTA ================= */}

      <ServicesCTA />

      {/* ================= Footer ================= */}

      <Footer />
       <AIChat/>
    </>
  );
}

export default Services;