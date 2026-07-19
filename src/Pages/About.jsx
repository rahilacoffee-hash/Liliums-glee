

import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";
import AboutHero from "../component/about/AboutHero";
import Story from "../component/about/Story";
import MissionVision from "../component/about/MissionVision";
import { Timeline } from "lucide-react";
import Process from "../component/about/Process";
import AboutCTA from "../component/about/AboutCTA";
import AIChat from "../component/AIChat";

function About() {
  return (
    <>
      {/* ================= Navbar ================= */}

      <Navbar />

      {/* ================= Hero ================= */}

      <AboutHero />

      {/* ================= Story ================= */}

      <Story />

      {/* ================= Mission & Vision ================= */}

      <MissionVision />

      {/* ================= Timeline ================= */}

      <Timeline />

      {/* ================= Process ================= */}

      <Process />

      {/* ================= CTA ================= */}

      <AboutCTA />

      {/* ================= Footer ================= */}

      <Footer />
       <AIChat/>
    </>
  );
}

export default About;