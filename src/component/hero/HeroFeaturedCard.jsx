import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeRight, floatingCard, cardHover } from "./heroVariants";

function HeroFeaturedCard({ hero }) {
  const featuredCollection = hero.featuredCollection;

  return (
    <motion.aside variants={fadeRight} initial="hidden" animate="visible" className="relative hidden lg:block">
      <motion.div variants={floatingCard} animate="animate">
        <motion.div
          variants={cardHover}
          whileHover="whileHover"
          className="w-[360px] overflow-hidden rounded-[32px] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-2xl"
        >
          <div className="relative h-60 overflow-hidden">
            <img
              src={featuredCollection.image}
              alt={featuredCollection.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-[#C8A96A] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#111111]">
              {featuredCollection.badge}
            </span>
          </div>

          <div className="space-y-5 p-7">
            <div>
              <p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">{featuredCollection.eyebrow}</p>
              <h3 className="mt-3 font-serif text-3xl text-white">{featuredCollection.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{featuredCollection.description}</p>
            </div>

            <Link
              to={featuredCollection.button?.href || "/shop"}
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[2px] text-[#C8A96A]"
            >
              {featuredCollection.button?.label || "Explore Collection"}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}

export default HeroFeaturedCard;