import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroFeaturedCard from "./HeroFeaturedCard";
import HeroBottomBar from "./HeroBottomBar";

import { sectionReveal, staggerContainer } from "./heroVariants";

function Hero() {
  let [hero, setHero] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      try {
        let { data } = await axiosInstance.get("/site-content");
        setHero(data.data.hero);
      } catch (err) {
        console.error("Failed to load hero content:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  // Keep the section's height stable while loading so the page doesn't jump
  if (loading || !hero) {
    return <div className="min-h-screen bg-[#0F1713]" />;
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen overflow-hidden bg-[#0F1713]"
    >
      <HeroBackground hero={hero} />

      <div className="relative z-20 flex min-h-screen flex-col">
        <div className="container-custom flex flex-1 items-center">
          <motion.div
            variants={staggerContainer}
            className="grid w-full items-center gap-20 py-32 lg:grid-cols-[1.1fr_.9fr]"
          >
            <HeroContent hero={hero} />

            <div className="mt-40 mb-30 flex justify-end">
              <HeroFeaturedCard hero={hero} />
            </div>
          </motion.div>
        </div>

        <HeroBottomBar hero={hero} />
      </div>
    </motion.section>
  );
}

export default Hero;