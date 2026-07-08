import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import whyChooseData, {
  features,
} from "./whyChooseData";

import {
  containerVariants,
  fadeUp,
  featureReveal,
  featureHover,
  dividerReveal,
  buttonVariants,
  arrowVariants,
} from "./whyChooseVariants";

function WhyChooseContent() {
  return (
    <motion.div
      variants={containerVariants}
      className="max-w-2xl"
    >
      {/* Eyebrow */}

      <motion.p
        variants={fadeUp}
        className="mb-4 text-sm font-medium uppercase tracking-[4px] text-[#C8A96A]"
      >
        {whyChooseData.eyebrow}
      </motion.p>

      {/* Heading */}

      <motion.h2
        variants={fadeUp}
        className="font-serif text-5xl leading-tight text-[#111111] lg:text-6xl"
      >
        {whyChooseData.title}

        <span className="block text-[#C8A96A]">
          {whyChooseData.highlight}
        </span>
      </motion.h2>

      {/* Divider */}

      <motion.div
        variants={dividerReveal}
        className="my-8 h-px bg-[#C8A96A]"
      />

      {/* Description */}

      <motion.p
        variants={fadeUp}
        className="max-w-xl leading-8 text-[#666666]"
      >
        {whyChooseData.description}
      </motion.p>

      {/* Features */}

      <motion.div
        variants={containerVariants}
        className="mt-12 grid gap-6"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={featureReveal}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="rounded-2xl"
          >
            <motion.div
              variants={featureHover}
              className="flex items-start gap-5 rounded-2xl p-5"
            >
              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C8A96A]/10">
                <Check
                  size={20}
                  className="text-[#C8A96A]"
                />
              </div>

              {/* Text */}

              <div>
                <h3 className="text-xl font-semibold text-[#111111]">
                  {feature.title}
                </h3>

                <p className="mt-2 leading-7 text-[#666666]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}

      <motion.div
        variants={fadeUp}
        className="mt-12"
      >
        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="group flex items-center gap-4 rounded-full bg-[#C8A96A] px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-[#111111]"
        >
          {whyChooseData.cta}

          <motion.span
            variants={arrowVariants}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-[#C8A96A]"
          >
            <ArrowRight size={18} />
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default WhyChooseContent;