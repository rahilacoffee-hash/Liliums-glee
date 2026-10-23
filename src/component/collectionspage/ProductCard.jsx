
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

function ProductCard({ product, view = "grid" }) {
  const isOutOfStock = Number(product.stock) <= 0;

  const imageUrl =
    product.images?.[0]?.url ||
    "https://placehold.co/600x600?text=No+Image";

  const productUrl = `/shop/${product.slug}`;

  // =====================================
  // MOBILE-FRIENDLY LIST VIEW
  // =====================================
  if (view === "list") {
    return (
      <motion.article
        variants={productCard}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="group flex w-full overflow-hidden rounded-xl border border-[#E8E2D8] bg-white transition-all duration-300 hover:border-[#C8A96A] sm:rounded-2xl"
      >
        {/* Compact Image */}
        <Link
          to={productUrl}
          className="block w-[88px] shrink-0 self-stretch overflow-hidden bg-[#F8F5F0] min-[380px]:w-24 sm:w-32 md:w-36"
        >
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full min-h-[118px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:min-h-[140px]"
          />
        </Link>

        {/* Product Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-center p-2.5 min-[380px]:p-3 sm:p-4">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[1.5px] text-[#C8A96A] sm:text-[10px] sm:tracking-[2px]">
              {product.category}
            </p>

            {isOutOfStock && (
              <span className="shrink-0 rounded-full bg-[#8A3B2E]/10 px-1.5 py-0.5 text-[8px] font-semibold text-[#8A3B2E]">
                Sold out
              </span>
            )}

            {!isOutOfStock && product.badge && (
              <span className="shrink-0 rounded-full bg-[#111111] px-1.5 py-0.5 text-[8px] font-semibold text-white">
                {product.badge}
              </span>
            )}
          </div>

          <Link
            to={productUrl}
            className="mt-1 line-clamp-2 font-serif text-sm leading-5 text-[#111111] transition-colors hover:text-[#C8A96A] min-[380px]:text-base sm:text-lg"
          >
            {product.name}
          </Link>

          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#666666] min-[380px]:text-xs sm:leading-5">
            {product.description}
          </p>

          {/* Optional Product Colours */}
          {product.colors?.length > 0 && (
            <div className="mt-2 hidden items-center gap-1.5 min-[360px]:flex">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color._id || color.name}
                  title={color.name}
                  className="h-3 w-3 rounded-full border border-black/10 sm:h-3.5 sm:w-3.5"
                  style={{
                    backgroundColor: color.hex || "#C8A96A",
                  }}
                />
              ))}

              {product.colors.length > 4 && (
                <span className="text-[9px] text-[#777777]">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price and View Link */}
          <div className="mt-2.5 flex min-w-0 items-center justify-between gap-1.5 border-t border-[#E8E2D8] pt-2.5">
            <span className="min-w-0 truncate text-sm font-semibold text-[#111111] min-[380px]:text-base">
              ₦{Number(product.price).toLocaleString()}
            </span>

            {!isOutOfStock && (
              <Link
                to={productUrl}
                aria-label={`View ${product.name}`}
                className="inline-flex shrink-0 items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#C8A96A] transition-colors hover:text-[#111111] min-[380px]:text-[10px] sm:gap-1 sm:text-xs"
              >
                View
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // =====================================
  // RESPONSIVE GRID VIEW
  // =====================================
  return (
    <motion.article
      variants={productCard}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="group min-w-0 overflow-hidden rounded-xl border border-[#E8E2D8] bg-white transition-all duration-300 hover:border-[#C8A96A] hover:shadow-lg sm:rounded-2xl lg:rounded-[30px] lg:hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-[#F8F5F0]">
        <Link to={productUrl} className="block">
          <motion.img
            variants={imageHover}
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-44 w-full object-cover min-[400px]:h-52 sm:h-64 lg:h-72"
          />
        </Link>

        <motion.div
          variants={overlayVariants}
          className="pointer-events-none absolute inset-0 bg-black/10"
        />

        {/* Product Badge */}
        {isOutOfStock ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#8A3B2E] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px] lg:left-5 lg:top-5 lg:px-4 lg:py-2 lg:text-xs">
            Out of Stock
          </span>
        ) : (
          product.badge && (
            <motion.span
              variants={badgeReveal}
              className="absolute left-2 top-2 rounded-full bg-[#111111] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px] lg:left-5 lg:top-5 lg:px-4 lg:py-2 lg:text-xs"
            >
              {product.badge}
            </motion.span>
          )
        )}

        {/* Product Actions */}
        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 lg:right-5 lg:top-5">
          <ProductActions product={product} />
        </div>
      </div>

      {/* Product Content */}
      <div className="p-3 min-[400px]:p-4 sm:p-5 lg:p-7">
        <p className="truncate text-[9px] font-semibold uppercase tracking-[1.5px] text-[#C8A96A] sm:text-[10px] sm:tracking-[2px] lg:text-xs lg:tracking-[3px]">
          {product.category}
        </p>

        <Link to={productUrl}>
          <h3 className="mt-1.5 line-clamp-2 font-serif text-base leading-6 text-[#111111] transition-colors duration-300 group-hover:text-[#C8A96A] min-[400px]:text-lg sm:mt-2 sm:text-xl lg:mt-3 lg:text-2xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#666666] sm:mt-3 sm:text-xs sm:leading-6 lg:mt-4 lg:text-sm lg:leading-7">
          {product.description}
        </p>

        {/* Product Rating */}
        <div className="mt-2 scale-95 origin-left sm:mt-4 sm:scale-100 lg:mt-5">
          <ProductRating
            rating={product.rating}
            reviewCount={product.numReviews}
          />
        </div>

        {/* Product Colours */}
        {product.colors?.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2 lg:mt-5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color._id || color.name}
                title={color.name}
                className="h-3 w-3 rounded-full border border-black/10 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
                style={{
                  backgroundColor: color.hex || "#C8A96A",
                }}
              />
            ))}

            <span className="text-[9px] text-[#777777] sm:text-[10px] lg:text-xs">
              {product.colors.length} colours
            </span>
          </div>
        )}

        {/* Product Sizes */}
        {product.sizes?.length > 0 && (
          <p className="mt-2 text-[10px] text-[#777777] sm:mt-3 sm:text-xs">
            Sizes: {product.sizes.join(" · ")}
          </p>
        )}

        {/* Price and View Link */}
        <div className="mt-4 flex min-w-0 items-center justify-between gap-2 border-t border-[#E8E2D8] pt-3 sm:mt-6 sm:pt-4 lg:mt-8 lg:pt-5">
          <span className="min-w-0 truncate text-base font-semibold text-[#111111] min-[400px]:text-lg sm:text-xl lg:text-2xl">
            ₦{Number(product.price).toLocaleString()}
          </span>

          {isOutOfStock ? (
            <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wide text-[#8A3B2E] sm:text-[10px] lg:text-xs">
              Unavailable
            </span>
          ) : (
            <Link
              to={productUrl}
              className="group/link inline-flex shrink-0 items-center gap-0.5 text-[10px] font-medium uppercase tracking-wide text-[#C8A96A] sm:gap-1 sm:text-xs sm:tracking-wider lg:gap-2 lg:text-sm lg:tracking-[2px]"
            >
              View
              <motion.span variants={arrowVariants}>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 sm:h-[17px] sm:w-[17px] lg:h-[18px] lg:w-[18px]"
                />
              </motion.span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;



