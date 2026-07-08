import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import footerData from "./footerData";
import {
  fadeUp,
  hoverLift,
  underlineReveal,
} from "./footerVariants";

function FooterBrand() {
  return (
    <motion.div
      variants={fadeUp}
      className="max-w-xl"
    >
      {/* Brand */}

      <p className="mb-5 text-xs font-medium uppercase tracking-[5px] text-[#C8A96A]">
        Premium Interior Studio
      </p>

      {/* Logo */}

      <Link
        to="/"
        className="inline-block"
      >
        <motion.h2
          whileHover={{
            letterSpacing: "0.08em",
          }}
          transition={{
            duration: 0.3,
          }}
          className="font-serif text-5xl leading-none text-white md:text-6xl"
        >
          {footerData.brand.name}
        </motion.h2>
      </Link>

      {/* Divider */}

      <motion.div
        variants={underlineReveal}
        className="mt-8 h-px w-24 bg-[#C8A96A]"
      />

      {/* Tagline */}

      <motion.h3
        variants={fadeUp}
        className="mt-10 font-serif text-4xl leading-tight text-white md:text-5xl"
      >
        Designing
        <span className="block text-[#C8A96A]">
          Spaces That
        </span>
        Inspire.
      </motion.h3>

      {/* Description */}

      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-md text-base leading-8 text-white/65"
      >
        {footerData.brand.description}
      </motion.p>

      {/* CTA */}

      <motion.div
        variants={fadeUp}
        className="mt-10"
      >
        <motion.div
          variants={hoverLift}
          whileHover="whileHover"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[2px] text-[#C8A96A]"
          >
            Start Your Project

            <motion.span
              whileHover={{
                x: 4,
                y: -4,
              }}
              transition={{
                duration: 0.25,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A96A]/30"
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default FooterBrand;