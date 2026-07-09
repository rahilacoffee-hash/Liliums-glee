import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Armchair,
  Building2,
  Columns3,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroData from "./heroData";
import { bottomBarReveal } from "./heroVariants";

const icons = {
  Armchair,
  Columns3,
  Building2,
  ShoppingBag,
};

function HeroBottomBar() {
  return (
    <motion.div
      variants={bottomBarReveal}
      initial="hidden"
      animate="visible"
      className="
        absolute
        bottom-0
        left-0
        right-0
        z-20
        border-t
        border-white/10
        bg-black/35
        backdrop-blur-2xl
      "
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
          {heroData.showcase.map((item) => {
            const Icon = icons[item.icon];

            return (
              <Link
                key={item.id}
                to={item.href || "/services"}
                className="
                  group
                  flex
                  items-center
                  gap-5
                  px-6
                  py-6
                  transition-all
                  duration-300
                  hover:bg-white/5
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-white
                    border-white/10
                    bg-white/5
                    transition-all
                    duration-300
                    group-hover:border-[#C8A96A]
                    group-hover:bg-[#C8A96A]
                    group-hover:text-[#111111]
                  "
                >
                  <Icon size={24} />
                </div>

                {/* Content */}

                <div className="flex-1">
                  <h3
                    className="
                      font-medium
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-[#C8A96A]
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/60">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}

                <ArrowUpRight
                  size={18}
                  className="
                    text-white/40
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#C8A96A]
                  "
                />
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default HeroBottomBar;