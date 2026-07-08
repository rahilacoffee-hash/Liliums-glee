import { motion } from "framer-motion";
import MotionCounter from "../layout/MotionCounter";
import { heroStats } from "./heroData"; // 👈 import it

function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-14"
    >
      <div className="grid lg:grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
        {heroStats.map((stat, index) => (
          <div
            key={stat.id}
            className={`relative px-8 py-8 ${
              index !== heroStats.length - 1
                ? "border-r border-white/10"
                : ""
            }`}
          >
            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#C8A96A]" />

            <h3 className="font-serif text-4xl text-white">
              <MotionCounter
                value={Number(stat.value)}
                duration={2}
                suffix="+"
              />
            </h3>

            <p className="mt-2 text-xs uppercase tracking-[2px] text-white/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroStats;