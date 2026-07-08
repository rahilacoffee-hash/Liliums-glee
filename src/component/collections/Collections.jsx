import { motion } from "framer-motion";

import CollectionHeader from "./CollectionHeader";
import CollectionSlider from "./CollectionSlider";
import CollectionFeatures from ".//CollectionFeatures";

import { sectionReveal } from "./collectionVariants";

function Collections() {
  return (
    <motion.section
      id="collections"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative overflow-hidden bg-[#F8F5F0] py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Right Glow */}
        <div className="absolute -right-44 top-0 h-[420px] w-[420px] rounded-full bg-[#C8A96A]/8 blur-[140px]" />

        {/* Bottom Left Glow */}
        <div className="absolute -left-44 bottom-0 h-[420px] w-[420px] rounded-full bg-[#0D2B22]/6 blur-[150px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.025)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <CollectionHeader />

        {/* Slider */}
        <CollectionSlider />

        {/* Features */}
        <CollectionFeatures />
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-b from-transparent to-white/50" />
    </motion.section>
  );
}

export default Collections;