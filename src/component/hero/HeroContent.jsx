
import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import { staggerContainer, fadeUp, fadeLeft } from "./heroVariants";

function HeroContent({ hero }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-5xl"
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#E1BD8B] sm:text-sm"
      >
        <span className="h-px w-10 bg-[#C8A477]" />
        {hero.eyebrow || "INTERIOR DESIGN"}
      </motion.span>

      <motion.h1
        variants={fadeLeft}
        className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.045em] text-[#F8EBDD] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem]"
      >
        {hero.title || (
          <>
            LILIUMS
            <span className="mt-2 block pl-8 font-serif italic font-normal tracking-[-0.04em] text-[#E1BD8B] sm:pl-20">
              Gleee
            </span>
          </>
        )}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-xl text-sm leading-7 text-[#F5E9D8]/80 sm:text-base sm:leading-8 md:text-lg"
      >
        {hero.description ||
          "Thoughtfully designed interiors. Timeless materials. A new standard of modern luxury."}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-9">
        <HeroButtons
          primaryButton={hero.primaryButton}
          secondaryButton={hero.secondaryButton}
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-[#F5E9D8]/75 sm:text-xs"
      >
        {["Bespoke Interiors", "Timeless Materials", "Modern Luxury"].map(
          (item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8A477]" />
              {item}
            </span>
          )
        )}
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
