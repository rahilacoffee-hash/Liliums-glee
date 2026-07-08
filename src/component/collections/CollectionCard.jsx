import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  cardReveal,
  cardHover,
  imageHover,
  overlayVariants,
  arrowVariants,
} from "./collectionVariants";

function CollectionCard({ collection, dark = false }) {
  return (
    <motion.article
      variants={cardReveal}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group overflow-hidden rounded-[30px] ${
        dark ? "bg-[#0D2B22]" : "bg-white"
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          variants={imageHover}
          src={collection.image}
          alt={collection.title}
          className="h-[340px] w-full object-cover"
        />

        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-black"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={cardHover}
        className="p-8"
      >
        {/* Number */}
        <span className="mb-5 inline-flex items-center gap-3 text-sm tracking-[4px] uppercase text-[#C8A96A]">
          {String(collection.id).padStart(2, "0")}

          <span className="h-px w-10 bg-[#C8A96A]" />
        </span>

        {/* Title */}
        <h3
          className={`font-serif text-4xl leading-tight ${
            dark ? "text-white" : "text-[#111111]"
          }`}
        >
          {collection.title}
        </h3>

        {/* Description */}
        <p
          className={`mt-6 leading-8 ${
            dark ? "text-white/70" : "text-[#666]"
          }`}
        >
          {collection.description}
        </p>

        {/* Products */}
        <div
          className={`mt-6 text-sm uppercase tracking-[3px] ${
            dark ? "text-white/50" : "text-[#999]"
          }`}
        >
          {collection.products} Products
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="mt-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[2px] text-[#C8A96A]"
        >
          Explore Collection

          <motion.span variants={arrowVariants}>
            <ArrowRight size={18} />
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.article>
  );
}

export default CollectionCard;