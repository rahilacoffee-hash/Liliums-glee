import { motion } from "framer-motion";

import CTAContent from "./CTAContent";
import CTAStats from "./CTAStats";

import {
  sectionReveal,
  overlayReveal,
  backgroundZoom,
  glowAnimation,
} from "./ctaVariants";

import ctaBg from "../../assets/image/backgrounds/commercial.png"; // Replace with your image

function CTA() {
  return (
    <motion.section
      id="cta"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="relative overflow-hidden py-32 lg:py-40"
    >
      {/* ========================= */}
      {/* Background Image */}
      {/* ========================= */}

      <motion.div
        variants={backgroundZoom}
        initial="initial"
        animate="animate"
        className="absolute inset-0"
      >
        <img
          src={ctaBg}
          alt="Luxury Interior"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* ========================= */}
      {/* Overlay */}
      {/* ========================= */}

      <motion.div
        variants={overlayReveal}
        className="absolute inset-0 bg-[#0F1713]/80"
      />

      {/* Luxury Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1713]/90 via-[#0F1713]/60 to-[#0F1713]/90" />

      {/* ========================= */}
      {/* Decorative Glows */}
      {/* ========================= */}

      <motion.div
        variants={glowAnimation}
        animate="animate"
        className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#C8A96A]/15 blur-[140px]"
      />

      <motion.div
        variants={glowAnimation}
        animate="animate"
        transition={{
          delay: 2,
        }}
        className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]"
      />

      {/* ========================= */}
      {/* Decorative Ring */}
      {/* ========================= */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-40 right-10 hidden h-[450px] w-[450px] rounded-full border border-dashed border-white/10 xl:block"
      />

      {/* ========================= */}
      {/* Grid Pattern */}
      {/* ========================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* ========================= */}
      {/* Content */}
      {/* ========================= */}

      <div className="container-custom relative z-20">
        <CTAContent />

        <CTAStats />
      </div>

      {/* ========================= */}
      {/* Top Fade */}
      {/* ========================= */}

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F7F4EF] to-transparent" />

      {/* ========================= */}
      {/* Bottom Fade */}
      {/* ========================= */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
    </motion.section>
  );
}

export default CTA;