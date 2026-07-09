import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import aboutData from "./aboutData";

import {
  staggerContainer,
  timelineItem,
  fadeUp,
} from "./aboutVariants";

function Timeline() {
  const { timeline } = aboutData;

  return (
    <section className="bg-[#0F1713] py-24 md:py-32">
      <div className="container-custom">

        {/* Header */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            Our Journey
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl text-white md:text-5xl"
          >
            Every Great Brand
            <br />
            Starts With A Vision.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/65"
          >
            Every milestone represents another step toward creating
            beautiful interiors that inspire modern living.
          </motion.p>
        </motion.div>

        {/* Timeline */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative mx-auto max-w-5xl"
        >
          {/* Center Line */}

          <div className="absolute left-6 top-0 h-full w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              variants={timelineItem}
              className={`
                relative mb-20 flex flex-col lg:mb-24 lg:flex-row
                ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                }
              `}
            >
              {/* Content */}

              <div className="w-full lg:w-1/2 lg:px-12">
                <div
                  className="
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-[#C8A96A]/50
                    hover:bg-white/10
                  "
                >
                  <span className="text-sm uppercase tracking-[4px] text-[#C8A96A]">
                    {item.year}
                  </span>

                  <h3 className="mt-4 font-serif text-3xl text-white">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-8 text-white/65">
                    {item.description}
                  </p>

                  <button
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      uppercase
                      tracking-[2px]
                      text-[#C8A96A]
                    "
                  >
                    Learn More

                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* Timeline Dot */}

              <div
                className="
                  absolute
                  left-6
                  top-10
                  flex
                  h-5
                  w-5
                  -translate-x-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-[#0F1713]
                  bg-[#C8A96A]
                  lg:left-1/2
                "
              />

              {/* Empty Side */}

              <div className="hidden lg:block lg:w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Timeline;