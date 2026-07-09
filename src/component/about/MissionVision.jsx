import { motion } from "framer-motion";
import { Compass, Eye, Sparkles } from "lucide-react";

import aboutData from "./aboutData";

import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "./aboutVariants";

const icons = [
  Compass,
  Eye,
  Sparkles,
  Sparkles,
];

function MissionVision() {
  const { mission, vision, values } = aboutData;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            Our Foundation
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            Guided by Purpose,
            <br />
            Driven by Excellence.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            Everything we create is rooted in thoughtful design,
            exceptional craftsmanship, and a commitment to spaces
            that inspire everyday living.
          </motion.p>
        </motion.div>

        {/* ========================= */}
        {/* Mission & Vision */}
        {/* ========================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Mission */}

          <motion.div
            variants={cardHover}
            whileHover="whileHover"
            className="rounded-[32px] border border-[#ECE6DD] bg-[#F8F5F0] p-10 md:p-12"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#C8A96A]/15">
              <Compass
                size={30}
                className="text-[#C8A96A]"
              />
            </div>

            <p className="text-sm uppercase tracking-[3px] text-[#C8A96A]">
              Mission
            </p>

            <h3 className="mt-5 font-serif text-3xl text-[#111111]">
              {mission.title}
            </h3>

            <p className="mt-6 text-lg leading-9 text-[#666666]">
              {mission.description}
            </p>
          </motion.div>

          {/* Vision */}

          <motion.div
            variants={cardHover}
            whileHover="whileHover"
            className="rounded-[32px] bg-[#111111] p-10 text-white md:p-12"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Eye
                size={30}
                className="text-[#C8A96A]"
              />
            </div>

            <p className="text-sm uppercase tracking-[3px] text-[#C8A96A]">
              Vision
            </p>

            <h3 className="mt-5 font-serif text-3xl">
              {vision.title}
            </h3>

            <p className="mt-6 text-lg leading-9 text-white/75">
              {vision.description}
            </p>
          </motion.div>
        </motion.div>

        {/* ========================= */}
        {/* Core Values */}
        {/* ========================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {values.map((value, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={value.id}
                variants={cardHover}
                whileHover="whileHover"
                className="rounded-3xl border border-[#ECE6DD] p-8 transition-all duration-300 hover:border-[#C8A96A]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F5F0]">
                  <Icon
                    size={24}
                    className="text-[#C8A96A]"
                  />
                </div>

                <h4 className="font-serif text-2xl text-[#111111]">
                  {value.title}
                </h4>

                <p className="mt-4 leading-8 text-[#666666]">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default MissionVision;