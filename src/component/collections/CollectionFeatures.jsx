import { motion } from "framer-motion";

import { collectionFeatures } from "./collectionData";
import { featureVariants } from "./collectionVariants";

function CollectionFeatures() {
  return (
    <div className="mt-20 grid grid-cols-1 gap-6 border-t border-[#E9E4DB] pt-12 md:grid-cols-2 xl:grid-cols-4">
      {collectionFeatures.map((feature) => (
        <motion.div
          key={feature.id}
          variants={featureVariants}
          whileHover={{
            y: -8,
          }}
          transition={{
            duration: 0.3,
          }}
          className="group rounded-[24px] border border-[#E9E4DB] bg-white p-8 transition-all duration-300 hover:border-[#C8A96A]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >
          {/* Number */}
          <span className="text-sm font-medium tracking-[3px] uppercase text-[#C8A96A]">
            {String(feature.id).padStart(2, "0")}
          </span>

          {/* Divider */}
          <div className="my-5 h-px w-12 bg-[#C8A96A]" />

          {/* Title */}
          <h3 className="font-serif text-2xl text-[#111111] transition-colors duration-300 group-hover:text-[#C8A96A]">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="mt-4 leading-7 text-[#666666]">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default CollectionFeatures;