import { motion } from "framer-motion";

import heroData from "./heroData";
import {
  backgroundZoom,
  decorativeGlow,
} from "./heroVariants";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ============================= */}
      {/* Background Image */}
      {/* ============================= */}

      <motion.img
        src={heroData.backgroundImage}
        alt="Luxury Interior"
        variants={backgroundZoom}
        initial="initial"
        animate="animate"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* ============================= */}
      {/* Dark Overlay */}
      {/* ============================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/55
        "
      />

      {/* ============================= */}
      {/* Gradient Overlay */}
      {/* ============================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/75
          via-black/45
          to-black/20
        "
      />

      {/* Bottom Fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-64
          bg-gradient-to-t
          from-black/70
          via-black/20
          to-transparent
        "
      />

      {/* ============================= */}
      {/* Blueprint Grid */}
      {/* ============================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* ============================= */}
      {/* Left Glow */}
      {/* ============================= */}

      <motion.div
        variants={decorativeGlow}
        animate="animate"
        className="
          absolute
          -left-40
          top-1/4
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#C8A96A]/15
          blur-[150px]
        "
      />

      {/* ============================= */}
      {/* Right Glow */}
      {/* ============================= */}

      <motion.div
        variants={decorativeGlow}
        animate="animate"
        className="
          absolute
          -right-48
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C8A96A]/10
          blur-[180px]
        "
      />

      {/* ============================= */}
      {/* Decorative Ring */}
      {/* ============================= */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          -top-48
          -right-32
          hidden
          h-[550px]
          w-[550px]
          rounded-full
          border
          border-dashed
          border-white/10
          xl:block
        "
      />
    </div>
  );
}

export default HeroBackground;