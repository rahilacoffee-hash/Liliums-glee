import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import collectionData from "./collectionData";

import {
  fadeUp,
  containerVariants,
} from "./collectionVariants";

function CollectionHeader() {
  return (
    <motion.div
      variants={containerVariants}
      className="mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
    >
      {/* Left */}
      <div className="max-w-3xl">
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm font-medium uppercase tracking-[4px] text-[#C8A96A]"
        >
          {collectionData.eyebrow}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-serif text-5xl leading-tight text-[#111111] md:text-6xl"
        >
          {collectionData.title}

          <span className="block text-[#C8A96A]">
            {collectionData.highlight}
          </span>
        </motion.h2>
      </div>

      {/* Right */}
      <motion.div
        variants={fadeUp}
        className="max-w-xl"
      >
        <p className="leading-8 text-[#666666]">
          {collectionData.description}
        </p>

        <motion.button
          whileHover={{
            x: 6,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="group mt-8 flex items-center gap-4 text-sm font-medium uppercase tracking-[2px] text-[#C8A96A]"
        >
          {collectionData.cta}

          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A96A]/40 transition-all duration-300 group-hover:border-[#C8A96A] group-hover:bg-[#C8A96A] group-hover:text-white">
            <ArrowRight size={18} />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default CollectionHeader;