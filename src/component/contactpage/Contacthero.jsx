import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import contactData from "./contactData";
import { fadeUp, fadeRight, heroImage, staggerContainer } from "./contactVariants";

function ContactHero() {
  let { hero } = contactData;

  return (
    <section className="relative overflow-hidden bg-[#0D0B08]">
      <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2">

        {/* Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center px-8 py-20 md:px-16 lg:py-0"
        >
          <motion.p variants={fadeUp} className="mb-5 text-xs uppercase tracking-[4px] text-[#C8A96A]">
            {hero.eyebrow}
          </motion.p>

          <motion.h1 variants={fadeUp} className="mb-6 font-serif text-4xl leading-[1.15] text-white md:text-6xl">
            {hero.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mb-10 max-w-md text-base leading-8 text-white/60">
            {hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href={hero.primaryButton.href}
              className="rounded-full bg-[#C8A96A] px-7 py-3.5 text-sm font-semibold uppercase tracking-[1px] text-black transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {hero.primaryButton.label}
            </a>
            <Link
              to={hero.secondaryButton.href}
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-[1px] text-white transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              {hero.secondaryButton.label}
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={heroImage}
          initial="hidden"
          animate="visible"
          className="relative min-h-[320px] overflow-hidden lg:min-h-0"
        >
          <img src={hero.image} alt="Interior consultation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08]/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

export default ContactHero;