import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductRating from "./ProductRating";
import ProductActions from "./ProductActions";

import {
  productCard,
  imageHover,
  overlayVariants,
  badgeReveal,
  arrowVariants,
} from "./collectionsVariants";

function ProductCard({ product }) {
  return (
    <motion.article
      variants={productCard}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="group overflow-hidden rounded-[30px] border border-[#E8E2D8] bg-white transition-all duration-300 hover:border-[#C8A96A] hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F8F5F0]">
        <motion.img
          variants={imageHover}
          src={
            product.images?.length
              ? product.images[0].url
              : "https://placehold.co/600x600?text=No+Image"
          }
          alt={product.name}
          className="h-[360px] w-full object-cover"
        />

        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-black/10"
        />

        {product.badge && (
          <motion.span
            variants={badgeReveal}
            className="absolute left-5 top-5 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-white"
          >
            {product.badge}
          </motion.span>
        )}

        <div className="absolute right-5 top-5">
          <ProductActions product={product} />
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-[#C8A96A]">
          {product.category}
        </p>

        <h3 className="mt-3 font-serif text-2xl text-[#111111] transition-colors duration-300 group-hover:text-[#C8A96A]">
          {product.name}
        </h3>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-[#666666]">
          {product.description}
        </p>

        <div className="mt-5">
          <ProductRating
            rating={product.rating}
            reviewCount={product.numReviews}
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-2xl font-semibold text-[#111111]">
            ₦{Number(product.price).toLocaleString()}
          </span>

          <Link
            to={`/shop/${product.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[2px] text-[#C8A96A]"
          >
            View

            <motion.span variants={arrowVariants}>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
              />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;