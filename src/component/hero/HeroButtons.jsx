import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

import heroData from "./heroData";
import { buttonHover } from "./heroVariants";

function HeroButtons() {
  const [primaryButton, secondaryButton] = heroData.buttons;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* ========================= */}
      {/* Primary Button */}
      {/* ========================= */}

      <motion.div
        variants={buttonHover}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Link
          to={primaryButton.href}
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
          {primaryButton.label}

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

      {/* ========================= */}
      {/* Secondary Button */}
      {/* ========================= */}

      <motion.div
        variants={buttonHover}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <Link
          to={secondaryButton.href}
          className="
            group
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-white/20
            bg-white/10
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
            hover:bg-white/15
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              transition-colors
              duration-300
              group-hover:bg-[#C8A96A]
              group-hover:text-[#111111]
            "
          >
            <Play size={14} fill="currentColor" />
          </span>

          {secondaryButton.label}
        </Link>
      </motion.div>
    </div>
  );
}

export default HeroButtons;