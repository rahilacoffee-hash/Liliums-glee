import { motion } from "framer-motion";

import ctaData from "./ctaData";
import CTAButtons from "./CTAButtons";

import {
  containerVariants,
  fadeUp,
  headingReveal,
} from "./ctaVariants";

function CTAContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="relative z-20 mx-auto max-w-4xl text-center"
    >
      {/* Eyebrow */}

      <motion.div
        variants={fadeUp}
        className="mb-6 flex items-center justify-center gap-5"
      >
        <span className="h-px w-14 bg-[#C8A96A]" />

        <p className="text-xs font-medium uppercase tracking-[4px] text-[#C8A96A]">
          {ctaData.eyebrow}
        </p>

        <span className="h-px w-14 bg-[#C8A96A]" />
      </motion.div>

      {/* Heading */}

      <h2 className="font-serif text-5xl leading-[0.95] text-white md:text-6xl lg:text-7xl xl:text-[82px]">
        <motion.span
          variants={headingReveal}
          className="block overflow-hidden"
        >
          {ctaData.title}
        </motion.span>

        <motion.span
          variants={headingReveal}
          className="block overflow-hidden text-[#C8A96A]"
        >
          {ctaData.highlight}
        </motion.span>
      </h2>

      {/* Divider */}

      <motion.div
        variants={fadeUp}
        className="mx-auto my-10 h-px w-28 bg-[#C8A96A]"
      />

      {/* Description */}

      <motion.p
        variants={fadeUp}
        className="mx-auto max-w-2xl text-lg leading-9 text-white/75 lg:text-xl"
      >
        {ctaData.description}
      </motion.p>

      {/* Buttons */}

      <motion.div
        variants={fadeUp}
        className="mt-14"
      >
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}

export default CTAContent;