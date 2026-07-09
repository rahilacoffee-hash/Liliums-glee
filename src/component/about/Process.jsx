import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import aboutData from "./aboutData";

import {
  staggerContainer,
  processCard,
  fadeUp,
} from "./aboutVariants";

function Process() {
  const { process } = aboutData;

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="mx-auto max-w-[1700px] px-6 lg:px-10">
        {/* ================= Header ================= */}

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
            Our Process
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            From Vision
            <br />
            To Reality.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            We follow a simple, transparent process that keeps you informed
            from the first conversation to the final reveal.
          </motion.p>
        </motion.div>

        {/* ================= Process ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-8 xl:flex-row"
        >
          {process.map((step, index) => (
            <div
              key={step.step}
              className="relative flex-1"
            >
              <motion.div
                variants={processCard}
                whileHover={{ y: -8 }}
                className="
                  flex
                  h-full
                  min-h-[380px]
                  flex-col
                  rounded-[28px]
                  border
                  border-[#E7E1D7]
                  bg-white
                  p-8
                  transition-all
                  duration-300
                  hover:border-[#C8A96A]
                  hover:shadow-2xl
                "
              >
                {/* Step */}

                <span className="font-serif text-6xl text-[#C8A96A]/20">
                  {step.step}
                </span>

                {/* Icon */}

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F5F0]">
                  <CheckCircle2
                    size={24}
                    className="text-[#C8A96A]"
                  />
                </div>

                {/* Title */}

                <h3 className="mt-8 font-serif text-[30px] leading-tight text-[#111111]">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-5 flex-1 text-lg leading-8 text-[#666666]">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector */}

              {index !== process.length - 1 && (
                <>
                  <ArrowRight
                    size={24}
                    className="
                      absolute
                      -right-5
                      top-1/2
                      z-10
                      hidden
                      -translate-y-1/2
                      text-[#C8A96A]
                      xl:block
                    "
                  />

                  <ArrowDown
                    size={24}
                    className="
                      mx-auto
                      mt-6
                      text-[#C8A96A]
                      xl:hidden
                    "
                  />
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Process;