import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import ProjectSlider from "./ProjectSlider";
import { sectionReveal, fadeUp } from "./projectVariants";

function FeaturedProjects() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="overflow-hidden bg-[#F7F4EF] py-32 lg:py-40"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="mb-20 flex flex-col gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[4px] text-[#C8A96A]">
              Featured Projects
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#111111] md:text-5xl lg:text-6xl">
              Exceptional Spaces,
              <br />
              Thoughtfully Crafted
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#666]">
              Every project reflects our commitment to timeless design,
              premium craftsmanship, and spaces that elevate everyday living.
            </p>
          </div>

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            className="group flex w-fit items-center gap-3 rounded-full border border-[#C8A96A]/30  mb-6 bg-white px-6 py-3 text-sm font-medium tracking-wide text-[#111] transition-all duration-300 hover:border-[#C8A96A] hover:shadow-lg"
          >
            View All Projects

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A96A] text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </motion.button>
        </motion.div>

        {/* Slider */}
        <motion.div
          variants={fadeUp}
          className="pb-24 lg:pb-28"
        >
          <ProjectSlider />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FeaturedProjects;