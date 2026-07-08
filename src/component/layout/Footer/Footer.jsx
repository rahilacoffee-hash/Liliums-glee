import { motion } from "framer-motion";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

import {
  sectionReveal,
  containerVariants,
  glowAnimation,
  backgroundGlow,
} from "./footerVariants";

function Footer() {
  return (
    <motion.footer
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative overflow-hidden bg-[#0F1713] pt-32"
    >
      {/* ===================================== */}
      {/* Background Grid */}
      {/* ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      {/* ===================================== */}
      {/* Left Glow */}
      {/* ===================================== */}

      <motion.div
        variants={glowAnimation}
        animate="animate"
        className="
          absolute
          -left-44
          top-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#C8A96A]/10
          blur-[160px]
        "
      />

      {/* ===================================== */}
      {/* Right Glow */}
      {/* ===================================== */}

      <motion.div
        variants={backgroundGlow}
        animate="animate"
        className="
          absolute
          -right-52
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#73B72B]/10
          blur-[180px]
        "
      />

      {/* ===================================== */}
      {/* Decorative Ring */}
      {/* ===================================== */}

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
          right-16
          hidden
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-dashed
          border-white/10
          xl:block
        "
      />

      {/* ===================================== */}
      {/* Content */}
      {/* ===================================== */}

      <div className="container-custom relative z-20">
        <motion.div
          variants={containerVariants}
          className="
            grid
            gap-20
            pb-20

            lg:grid-cols-[1.3fr_.9fr_.8fr]
          "
        >
          {/* Brand */}

          <FooterBrand />

          {/* Navigation + Services */}

          <FooterLinks />

          {/* Contact */}

          <FooterContact />
        </motion.div>

        {/* Bottom */}

        <FooterBottom />
      </div>

      {/* ===================================== */}
      {/* Top Divider */}
      {/* ===================================== */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A96A]/30 to-transparent" />

      {/* ===================================== */}
      {/* Bottom Fade */}
      {/* ===================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.footer>
  );
}

export default Footer;