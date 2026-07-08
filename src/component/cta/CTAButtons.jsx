import { motion } from "framer-motion";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

import ctaData from "./ctaData";

import {
  buttonContainer,
  buttonReveal,
  primaryButtonVariants,
  secondaryButtonVariants,
  arrowVariants,
} from "./ctaVariants";

function CTAButtons() {
  return (
    <motion.div
      variants={buttonContainer}
      className="flex flex-col items-center justify-center gap-5 sm:flex-row"
    >
      {/* Primary Button */}

      <motion.div variants={buttonReveal}>
        <motion.div
          variants={primaryButtonVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to={ctaData.primaryButton.href}
            className="group inline-flex h-14 items-center gap-4 rounded-full bg-[#C8A96A] px-8 text-[15px] font-medium tracking-wide text-[#111111] transition-colors duration-300 hover:bg-[#d6b579]"
          >
            <span>{ctaData.primaryButton.text}</span>

            <motion.span
              variants={arrowVariants}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-[#C8A96A]"
            >
              <ChevronRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Secondary Button */}

      <motion.div variants={buttonReveal}>
        <motion.div
          variants={secondaryButtonVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to={ctaData.secondaryButton.href}
            className="group inline-flex h-14 items-center gap-4 rounded-full border border-white/15 bg-white/5 px-8 backdrop-blur-xl transition-all duration-300 hover:border-white/30"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:bg-[#C8A96A] group-hover:text-[#111111]">
              <FolderOpen size={16} />
            </span>

            <span className="text-[15px] font-medium tracking-wide text-white">
              {ctaData.secondaryButton.text}
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default CTAButtons;