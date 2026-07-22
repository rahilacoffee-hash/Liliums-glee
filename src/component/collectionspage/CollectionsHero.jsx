import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
} from "./collectionsVariants";

function CollectionsHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0] pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background Accent */}

      <div className="absolute inset-0">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#C8A96A]/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-[#0D2B22]/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* ================= Left ================= */}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
            >
              {collectionsData.eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeLeft}
              className="mt-6 font-serif text-5xl leading-tight text-[#111111] md:text-6xl xl:text-7xl"
            >
              {collectionsData.title}

              <span className="block text-[#C8A96A]">
                {collectionsData.highlight}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-9 text-[#666666]"
            >
              {collectionsData.description}
            </motion.p>

            
          </motion.div>

          {/* ================= Right ================= */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="overflow-hidden rounded-[36px] shadow-2xl">
              <img
                src="https://framerusercontent.com/images/hQTt9osnaDrAOMaXRDqCvasgs1E.png?width=1700&height=958"
                alt="Luxury Interior Collection"
                className="h-[650px] w-full object-cover"
              />
            </div>

            {/* Floating Card */}

            <div
              className="
                absolute
                bottom-8
                left-8
                rounded-3xl
                border
                border-white/20
                bg-white/90
                p-6
                shadow-xl
                backdrop-blur-xl
              "
            >
              <p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">
                Premium Collection
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[#111111]">
                Timeless Luxury
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-7 text-[#666666]">
                Carefully selected products crafted to transform every interior
                into a luxurious living experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CollectionsHero;