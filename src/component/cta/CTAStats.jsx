import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Users, Briefcase, TrendingUp, Star, ThumbsUp } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

import { statsContainer, statCardReveal, floatingCard } from "./ctaVariants";

// Maps the string icon name stored in the backend to an actual component -
// same pattern as HeroBottomBar's icon lookup.
const icons = { Award, Users, Briefcase, TrendingUp, Star, ThumbsUp };

function CTAStats() {
  let [stats, setStats] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        let { data } = await axiosInstance.get("/site-content");
        setStats(data.data.ctaStats || []);
      } catch (err) {
        console.error("Failed to load CTA stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading || stats.length === 0) {
    return <div className="relative z-20 mt-20 grid gap-6 md:grid-cols-3" />;
  }

  return (
    <motion.div
      variants={statsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-20 mt-20 grid gap-6 md:grid-cols-3"
    >
      {stats.map((stat, index) => {
        const Icon = icons[stat.icon] ?? Award;

        return (
          <motion.div
            key={stat.id}
            variants={statCardReveal}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-[30px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
          >
            <motion.div
              variants={floatingCard}
              animate="animate"
              transition={{ delay: index * 0.5 }}
              className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#C8A96A]/10 blur-[70px]"
            />

            <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:bg-[#C8A96A] group-hover:text-[#111111]">
              <Icon size={30} className="text-[#C8A96A] transition-colors duration-300 group-hover:text-[#111111]" />
            </div>

            <h3 className="relative z-10 font-serif text-5xl text-white md:text-6xl">{stat.value}</h3>

            <p className="relative z-10 mt-4 text-base leading-7 text-white/70">{stat.label}</p>

            <div className="relative z-10 mt-8 flex items-center gap-3">
              <span className="h-px w-12 bg-[#C8A96A]" />
              <div className="h-2 w-2 rounded-full bg-[#C8A96A]" />
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#C8A96A]"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default CTAStats;