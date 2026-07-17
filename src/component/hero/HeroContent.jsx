import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import { staggerContainer, fadeUp, fadeLeft } from "./heroVariants";

function HeroContent({ hero }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-20 max-w-3xl">

      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A96A] backdrop-blur-xl"
      >
        <span className="h-2 w-2 rounded-full bg-[#C8A96A]" />
        {hero.eyebrow}
      </motion.span>

      <motion.h1
        variants={fadeLeft}
        className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        {hero.title}
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-9 text-white/75 md:text-xl">
        {hero.description}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-12">
        <HeroButtons primaryButton={hero.primaryButton} secondaryButton={hero.secondaryButton} />
      </motion.div>

      <motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-center gap-6 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
          Premium Finishes
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
          Bespoke Designs
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
          Nationwide Delivery
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;