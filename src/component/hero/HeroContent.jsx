import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag } from "lucide-react";

import HeroStats from "./HeroStats";

import {
  containerVariants,
  fadeUp,
  headingReveal,
  dividerVariants,
  primaryButtonVariants,
  secondaryButtonVariants,
  arrowVariants,
} from "./heroVariants";

function HeroContent({ slide }) {
  return (
    <div className="relative flex w-full flex-col justify-center bg-gradient-to-br from-[#0d2b22] to-[#123128] px-8 py-10 pt-42 md:w-1/2 md:px-14 md:py-16 md:pt-40">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {/* Eyebrow */}

          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-medium uppercase tracking-[3px] text-[#D6A354]"
          >
            {slide.eyebrow}
          </motion.p>

          {/* Heading */}

          <h1 className="mb-3 font-serif text-[52px] leading-[0.95] text-white lg:text-[72px] xl:text-[82px]">
            {slide.headlineLines.map((line, i) => (
              <motion.span
                key={i}
                variants={headingReveal}
                className="block overflow-hidden"
              >
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className={
                      word === slide.highlight ? "text-[#D6A354]" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.span>
            ))}
          </h1>

          {/* Divider */}

          <motion.div
            variants={dividerVariants}
            className="my-6 h-px bg-[#D6A354]"
          />

          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-md text-sm leading-8 text-white/60"
          >
            {slide.description}
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-wrap items-center gap-5"
          >
            {/* Explore */}

            <motion.button
              variants={primaryButtonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className="group flex h-14 items-center gap-4 rounded-full bg-[#C8A96A] px-8 text-[15px] font-medium tracking-wide text-[#111111]"
            >
              <span>Explore Project</span>

              <motion.span
                variants={arrowVariants}
                whileHover="whileHover"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-[#C8A96A]"
              >
                <ChevronRight size={16} />
              </motion.span>
            </motion.button>

            {/* Shop */}

            <motion.button
              variants={secondaryButtonVariants}
              whileHover="whileHover"
              whileTap={{ scale: 0.97 }}
              className="group flex h-14 items-center gap-4 rounded-full border border-white/15 bg-white/5 px-7 backdrop-blur-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 group-hover:bg-[#C8A96A] group-hover:text-[#111111]">
                <ShoppingBag size={16} />
              </span>

              <span className="text-[15px] font-medium tracking-wide text-white">
                Shop Collection
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Stats */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.3,
          duration: 0.8,
        }}
      >
        <HeroStats />
      </motion.div>
    </div>
  );
}

export default HeroContent;