
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { whyChooseStats } from "./whyChooseData";

import {
  statsContainer,
  statReveal,
  statHover,
} from "./whyChooseVariants";
import MotionCounter from "../layout/MotionCounter";

function StatCard({ stat }) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      variants={statReveal}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={statHover}
        className="
          rounded-[28px]
          border
          border-[#E9E3D8]
          bg-white
          p-8
          shadow-[0_15px_40px_rgba(0,0,0,.05)]
          transition-colors
          hover:border-[#C8A96A]/40
        "
      >
        <h3 className="font-serif text-5xl text-[#111111]">
          {isInView && (
            <MotionCounter
              value={stat.value}
              duration={2}
            />
          )}
          {stat.suffix}
        </h3>

        <div className="my-5 h-px w-12 bg-[#C8A96A]" />

        <p className="text-sm uppercase tracking-[3px] text-[#666666]">
          {stat.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

function WhyChooseStats() {
  return (
    <motion.div
      variants={statsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      className="
        mt-24
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {whyChooseStats.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
        />
      ))}
    </motion.div>
  );
}

export default WhyChooseStats;