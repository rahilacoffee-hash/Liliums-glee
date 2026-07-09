import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import servicesData from "./servicesData";

import {
  sectionReveal,
  staggerContainer,
  fadeUp,
  buttonHover,
} from "./servicesVariants";

function ServicesCTA() {
  const { cta } = servicesData;

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden bg-[#0F1713] py-24 md:py-32"
    >
      {/* ================= Background ================= */}

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8A96A15,transparent_60%)]" />

        <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#C8A96A]/10 blur-[170px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          className="mx-auto max-w-5xl text-center"
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

            {cta.eyebrow}
          </motion.span>

          {/* Heading */}

          <motion.h2
            variants={fadeUp}
            className="
              mt-8
              font-serif
              text-5xl
              font-light
              leading-tight
              text-white
              md:text-6xl
            "
          >
            {cta.title}
          </motion.h2>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-lg
              leading-9
              text-white/70
            "
          >
            {cta.description}
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            className="
              mt-12
              flex
              flex-col
              items-center
              justify-center
              gap-5
              sm:flex-row
            "
          >
            <motion.div
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Link
                to={cta.button.href}
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
                  hover:bg-[#d4b57b]
                "
              >
                {cta.button.text}

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

            <motion.div
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <a
                href="tel:08058814841"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#C8A96A]
                  hover:bg-white/5
                "
              >
                <Phone size={18} />

                Call Now
              </a>
            </motion.div>
          </motion.div>

          {/* Bottom */}

          <motion.div
            variants={fadeUp}
            className="
              mx-auto
              mt-16
              max-w-3xl
              border-t
              border-white/10
              pt-10
            "
          >
            <p className="font-serif text-2xl italic text-white/80 md:text-3xl">
              Your dream space is only one conversation away.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ServicesCTA;