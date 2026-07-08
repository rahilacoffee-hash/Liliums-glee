import { motion } from "framer-motion";

import TestimonialHeader from "./TestimonialHeader";
import TestimonialSlider from "./TestimonialSlider";
import TestimonialFeatures from "./TestimonialFeatures";

import { sectionReveal } from "./testimonialVariants";

function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative overflow-hidden bg-[#F7F4EF] py-32"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#111111 1px, transparent 1px),
              linear-gradient(90deg, #111111 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Decorative Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-24 h-[380px] w-[380px] rounded-full bg-[#C8A96A]/10 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-[#C8A96A]/8 blur-[150px]"
      />

      {/* Decorative Ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-24 right-10 hidden h-80 w-80 rounded-full border border-dashed border-[#C8A96A]/20 xl:block"
      />

      {/* Container */}
      <div className="container-custom relative z-10">
        {/* Header */}
        <TestimonialHeader />

        {/* Editorial Slider */}
        <div className="mt-20">
          <TestimonialSlider />
        </div>

      
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#F7F4EF]" />
    </motion.section>
  );
}

export default Testimonials;