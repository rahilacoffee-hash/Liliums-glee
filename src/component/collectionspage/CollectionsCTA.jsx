import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeUp,
  buttonHover,
} from "./collectionsVariants";

function CollectionsCTA() {
  const { cta } = collectionsData;

  return (
    <section className="relative overflow-hidden bg-[#0F1713] py-24 md:py-32">
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C8A96A]/10 blur-[160px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C8A96A15,transparent_70%)]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}

          <motion.span
            variants={fadeUp}
            className="inline-block text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            {cta.eyebrow}
          </motion.span>

          {/* Title */}

          <motion.h2
            variants={fadeUp}
            className="
              mt-6
              font-serif
              text-4xl
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

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            className="
              mt-14
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
                to={cta.primaryButton.href}
                className="
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
                  transition-colors
                  duration-300
                  hover:bg-[#D7B77A]
                "
              >
                {cta.primaryButton.label}

                <ArrowUpRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              variants={buttonHover}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Link
                to={cta.secondaryButton.href}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#C8A96A]
                  hover:bg-white/10
                "
              >
                {cta.secondaryButton.label}

                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}

          <motion.div
            variants={fadeUp}
            className="
              mt-16
              flex
              flex-wrap
              items-center
              justify-center
              gap-8
              text-sm
              text-white/60
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
              Premium Quality
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
              Secure Checkout
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#73B72B]" />
              Nationwide Delivery
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CollectionsCTA;