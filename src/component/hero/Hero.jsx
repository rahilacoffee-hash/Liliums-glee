import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroFeaturedCard from "./HeroFeaturedCard";
import HeroBottomBar from ".//HeroBottomBar";

import {
  sectionReveal,
  staggerContainer,
} from "./heroVariants";

function Hero() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0F1713]
      "
    >
      {/* ================= Background ================= */}

      <HeroBackground />

      {/* ================= Content ================= */}

      <div className="relative z-20 flex min-h-screen flex-col">
        {/* Navbar */}


        {/* Hero */}

        <div className="container-custom flex flex-1 items-center">
          <motion.div
            variants={staggerContainer}
            className="
              grid
              w-full
              items-center
              gap-20
              py-32

              lg:grid-cols-[1.1fr_.9fr]
            "
          >
            {/* Left */}

            <HeroContent />

            {/* Right */}

            <div className="flex justify-end mt-40 mb-30 ">
              <HeroFeaturedCard />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}

        <HeroBottomBar />
      </div>

      {/* Scroll Indicator */}
    </motion.section>
  );
}

export default Hero;