import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

import {
  footerBottom,
  legalLinks,
} from "./footerData";

import {
  dividerReveal,
  fadeUp,
  linkHover,
} from "./footerVariants";

function FooterBottom() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <motion.div
      variants={fadeUp}
      className="mt-24"
    >
      {/* Divider */}

      <motion.div
        variants={dividerReveal}
        className="mb-10 h-px origin-left bg-white/10"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="space-y-3">
          <p className="text-sm text-white/55">
            {footerBottom.copyright}
          </p>

          <p className="text-sm text-white/40">
            {footerBottom.credit.text}
          </p>
        </div>

        {/* Center */}

        <div className="flex flex-wrap items-center gap-8">
          {legalLinks.map((link) => (
            <motion.div
              key={link.name}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={linkHover}
            >
              <Link
                to={link.href}
                className="text-sm text-white/60 transition-colors duration-300"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right */}

        <motion.button
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={scrollToTop}
          className="group inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#111111] lg:self-auto"
        >
          Back to Top

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:-translate-y-1">
            <ArrowUp size={16} />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FooterBottom;