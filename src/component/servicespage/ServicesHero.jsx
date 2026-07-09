import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import servicesData from "./servicesData";

import {
  sectionReveal,
  staggerContainer,
  fadeUp,
  fadeLeft,
  imageReveal,
  buttonHover,
} from "./servicesVariants";

function ServicesHero() {
  const { hero } = servicesData;

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden bg-[#0F1713] pt-40 pb-24"
    >
      {/* Background Image */}

      <motion.img
        variants={imageReveal}
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/65" />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1713] via-[#0F1713]/80 to-transparent" />

      {/* Decorative Glow */}

      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#C8A96A]/10 blur-[180px]" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          className="max-w-3xl"
        >
          {/* Eyebrow */}

          <motion.span
            variants={fadeUp}
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C8A96A]/30
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

          {/* Heading */}

          <motion.h1
            variants={fadeLeft}
            className="
              mt-8
              font-serif
              text-5xl
              font-light
              leading-tight
              text-white
              md:text-7xl
            "
          >
            {hero.title}
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-9
              text-white/75
            "
          >
            {hero.description}
          </motion.p>

          {/* CTA */}

          <motion.div
            variants={buttonHover}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-12"
          >
            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#C8A96A]
                px-8
                py-4
                text-sm
                font-semibold
                uppercase
                tracking-[2px]
                text-[#111111]
                transition-all
                duration-300
                hover:bg-[#d6b679]
              "
            >
              Book Consultation

              <ArrowUpRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </motion.div>

          {/* Stats */}

          <motion.div
            variants={fadeUp}
            className="
              mt-20
              grid
              max-w-xl
              grid-cols-3
              gap-8
              border-t
              border-white/10
              pt-10
            "
          >
            <div>
              <h3 className="font-serif text-3xl text-[#C8A96A]">
                100%
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Tailored Designs
              </p>
            </div>

            <div>
              <h3 className="font-serif text-3xl text-[#C8A96A]">
                Premium
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Materials
              </p>
            </div>

            <div>
              <h3 className="font-serif text-3xl text-[#C8A96A]">
                End-to-End
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Service
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ServicesHero;