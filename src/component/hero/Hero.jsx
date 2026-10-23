
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroBottomBar from "./HeroBottomBar";

import { sectionReveal, staggerContainer } from "./heroVariants";

function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchHero() {
      try {
        const { data } = await axiosInstance.get("/site-content");

        if (active) {
          setHero(data?.data?.hero ?? null);
        }
      } catch (err) {
        console.error("Failed to load hero content:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchHero();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17110D]" />
    );
  }

  // Keep the hero visible with sensible defaults if the API fails.
  const content = hero ?? {
    backgroundImage: "/images/liliums-hero.png",
    eyebrow: "INTERIOR DESIGN",
    title: "Spaces that inspire. Living that elevates.",
    description:
      "We create refined interiors that balance timeless elegance, thoughtful details, and modern luxury.",
    primaryButton: { text: "Explore Our Work", href: "/projects" },
    secondaryButton: { text: "Start a Project", href: "/contact" },
    showcase: [],
  };

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="relative isolate min-h-screen overflow-hidden bg-[#17110D] text-[#F5E9D8]"
    >
      <HeroBackground hero={content} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="container-custom flex flex-1 items-center py-28 sm:py-32 lg:py-36">
          <motion.div
            variants={staggerContainer}
            className="grid w-full grid-cols-1 items-center"
          >
            <HeroContent hero={content} />
          </motion.div>
        </div>

        <HeroBottomBar hero={content} />
      </div>
    </motion.section>
  );
}

export default Hero;
