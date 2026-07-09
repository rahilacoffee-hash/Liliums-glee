import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutData from "./aboutData";

import {
  sectionReveal,
  staggerContainer,
  fadeUp,
  buttonHover,
} from "./aboutVariants";

function AboutCTA() {
  const { cta } = aboutData;

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
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C8A96A]/10 blur-[160px]" />

        <div className="absolute inset-0 bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] [background-size:70px_70px] opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
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
              border-[#C8A96A]/25
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
              max-w-2xl
              text-lg
              leading-9
              text-white/70
            "
          >
            {cta.description}
          </motion.p>

          {/* Button */}

          <motion.div
            variants={buttonHover}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-12"
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

          {/* Divider */}

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-16 h-px w-32 bg-[#C8A96A]/40"
          />

          {/* Closing Text */}

          <motion.p
            variants={fadeUp}
            className="
              mt-8
              font-serif
              text-2xl
              italic
              text-white/80
            "
          >
            "Beautiful spaces begin with a simple conversation."
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutCTA;