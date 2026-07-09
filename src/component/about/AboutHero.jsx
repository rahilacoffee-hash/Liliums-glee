import { motion } from "framer-motion";

import aboutData from "./aboutData";

import {
  sectionReveal,
  staggerContainer,
  fadeUp,
  fadeLeft,
  imageReveal,
} from "./aboutVariants";

function AboutHero() {
  const { hero } = aboutData;

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden bg-[#0F1713] pt-40 pb-24"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C8A96A]/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#C8A96A]/5 blur-[160px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          className="grid items-center gap-20 lg:grid-cols-2"
        >
          {/* ================= Left ================= */}

          <div>
            <motion.span
              variants={fadeUp}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#C8A96A]/20
                bg-[#C8A96A]/10
                px-5
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#C8A96A]
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#C8A96A]" />

              {hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeLeft}
              className="
                mt-8
                font-serif
                text-5xl
                font-light
                leading-tight
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              {hero.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-white/70
              "
            >
              {hero.description}
            </motion.p>

            {/* Decorative Line */}

            <motion.div
              variants={fadeUp}
              className="mt-12 h-px w-32 bg-[#C8A96A]"
            />
          </div>

          {/* ================= Right ================= */}

          <motion.div
            variants={imageReveal}
            className="relative"
          >
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={hero.image}
                alt={hero.title}
                className="
                  h-[600px]
                  w-full
                  object-cover
                "
              />
            </div>

            {/* Floating Card */}

            <div
              className="
                absolute
                -bottom-8
                -left-8
                hidden
                rounded-3xl
                border
                border-white/10
                bg-[#111111]/80
                px-8
                py-6
                backdrop-blur-xl
                lg:block
              "
            >
              <p className="text-sm uppercase tracking-[3px] text-[#C8A96A]">
                Since
              </p>

              <h3 className="mt-2 font-serif text-4xl text-white">
                2026
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Designing timeless spaces.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutHero;