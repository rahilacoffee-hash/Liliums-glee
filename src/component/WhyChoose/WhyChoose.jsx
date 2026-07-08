import { motion } from "framer-motion";

import WhyChooseContent from "./WhyChooseContent";
import WhyChooseImage from "./WhyChooseImage";
import WhyChooseStats from "./WhyChooseStats";

import {
  sectionReveal,
  containerVariants,
} from "./whyChooseVariants";

function WhyChoose() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="overflow-hidden bg-[#F7F4EF] py-32"
    >
      <div className="container-custom">
        {/* Top Content */}
        <motion.div
          variants={containerVariants}
          className="
            grid
            items-center
            gap-20
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* Left */}
          <WhyChooseImage />

          {/* Right */}
          <WhyChooseContent />
        </motion.div>

        {/* Stats */}
        <WhyChooseStats />
      </div>
    </motion.section>
  );
}

export default WhyChoose;