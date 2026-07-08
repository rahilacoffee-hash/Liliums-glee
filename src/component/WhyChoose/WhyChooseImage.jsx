import { motion } from "framer-motion";
import { Award, BriefcaseBusiness } from "lucide-react";

import whyChooseData from "./whyChooseData";

import {
  imageReveal,
  imageHover,
  floatingCard,
  badgeFloat,
} from "./whyChooseVariants";

function WhyChooseImage() {
  return (
    <motion.div
      variants={imageReveal}
      className="relative"
    >
      {/* Main Image */}

      <motion.div
        variants={imageHover}
        initial="rest"
        whileHover="hover"
        className="overflow-hidden rounded-[36px]"
      >
        <img
          src={whyChooseData.image}
          alt={whyChooseData.title}
          className="h-[720px] w-full object-cover"
        />
      </motion.div>

      {/* Dark Gradient */}

      <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {/* Experience Card */}

      <motion.div
        variants={floatingCard}
        animate="animate"
        className="
          absolute
          -left-10
          top-16
          hidden
          w-64
          rounded-[28px]
          border
          border-white/15
          bg-white/90
          p-6
          shadow-2xl
          backdrop-blur-xl
          lg:block
        "
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A96A]/10">
            <BriefcaseBusiness
              size={26}
              className="text-[#C8A96A]"
            />
          </div>

          <div>
            <h3 className="font-serif text-4xl text-[#111111]">
              15+
            </h3>

            <p className="text-sm leading-6 text-[#666666]">
              Years of Interior Excellence
            </p>
          </div>
        </div>
      </motion.div>

      {/* Award Card */}

      <motion.div
        variants={badgeFloat}
        animate="animate"
        className="
          absolute
          -right-8
          bottom-20
          hidden
          w-72
          rounded-[28px]
          border
          border-white/15
          bg-[#111111]/85
          p-7
          text-white
          shadow-2xl
          backdrop-blur-xl
          lg:block
        "
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A96A] text-[#111111]">
            <Award size={26} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">
              Trusted Excellence
            </p>

            <h3 className="mt-2 font-serif text-2xl">
              Premium Design &
              Craftsmanship
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/70">
              Creating timeless interiors with carefully selected
              finishes, bespoke details, and uncompromising quality.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Glow */}

      <div
        className="
          absolute
          -bottom-16
          -right-16
          h-64
          w-64
          rounded-full
          bg-[#C8A96A]/20
          blur-[120px]
        "
      />

      {/* Decorative Border */}

      <div
        className="
          absolute
          -bottom-6
          -left-6
          hidden
          h-full
          w-full
          rounded-[36px]
          border
          border-[#C8A96A]/20
          lg:block
        "
      />
    </motion.div>
  );
}

export default WhyChooseImage;