import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";
import ContactHero from "../component/contactpage/Contacthero";
import ContactInfo from "../component/contactpage/Contactinfo";
import ConsultationForm from "../component/contactpage/Consultationform";
import WhyChooseUs from "../component/contactpage/Whychooseus";
import StudioVisit from "../component/contactpage/Studiovisit";
import ContactFAQAndCTA from "../component/contactpage/Contactfaqandcta";
import AIChat from "../component/AIChat";



function Contact() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <ContactHero />

        <section className="bg-[#F8F5F0] py-20">
          <div className="container-custom mx-auto grid grid-cols-1 gap-16 px-6 lg:grid-cols-[380px_1fr]">
            <ContactInfo />
            <ConsultationForm />
          </div>
        </section>

        <WhyChooseUs />
        <StudioVisit />
        <ContactFAQAndCTA />
      </main>

      <Footer />
       <AIChat/>
    </>
  );
}

export default Contact;