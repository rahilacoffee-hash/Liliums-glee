import { motion } from "framer-motion";

import { testimonialFeatures } from "./testimonialData";
import { featureReveal } from "./testimonialVariants";

function TestimonialFeatures() {
  return (
    <div className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {testimonialFeatures.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.id}
            variants={featureReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
            }}
            className="group relative overflow-hidden rounded-[28px] border border-[#E8E2D9] bg-white p-8 transition-all duration-500 hover:border-[#C8A96A]/40 hover:shadow-[0_20px_60px_rgba(17,17,17,0.08)]"
          >
            {/* Background Glow */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#C8A96A]/10 opacity-0 blur-[80px] transition-all duration-500 group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F5F0] transition-all duration-500 group-hover:bg-[#C8A96A]">
              <Icon
                size={28}
                className="text-[#C8A96A] transition-all duration-500 group-hover:text-white"
              />
            </div>

            {/* Title */}
            <h3 className="relative z-10 font-serif text-2xl text-[#111111]">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 mt-5 leading-8 text-[#666666]">
              {feature.description}
            </p>

            {/* Bottom Accent */}
            <div className="relative z-10 mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8A96A]" />

              <div className="h-2 w-2 rounded-full bg-[#C8A96A]" />
            </div>

            {/* Hover Border */}
            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileHover={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.35,
              }}
              className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#C8A96A]"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default TestimonialFeatures;