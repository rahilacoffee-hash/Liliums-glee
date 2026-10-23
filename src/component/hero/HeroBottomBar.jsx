
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Armchair,
  Building2,
  Columns3,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { bottomBarReveal } from "./heroVariants";

const icons = { Armchair, Columns3, Building2, ShoppingBag };

function HeroBottomBar({ hero }) {
  const showcase = hero.showcase ?? [];

  if (!showcase.length) return null;

  return (
    <motion.div
      variants={bottomBarReveal}
      initial="hidden"
      animate="visible"
      className="relative z-20 border-t border-white/15 bg-[#100B07]/35 backdrop-blur-xl"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4 xl:divide-x">
          {showcase.map((item) => {
            const Icon = icons[item.icon] ?? Armchair;

            return (
              <Link
                key={item.id}
                to={item.href || "/services"}
                className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-white/5 sm:px-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C8A477]/40 text-[#E1BD8B] transition-colors group-hover:bg-[#C8A477] group-hover:text-[#17110D]">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-[#F5E9D8]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    {item.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E1BD8B]"
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
