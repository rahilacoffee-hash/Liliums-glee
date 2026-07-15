import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function ProductCard({ product, index }) {
  const rating = Math.round(product.rating || 0);
  const reviewCount = product.numReviews || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <Link
        to={`/shop/${product.slug}`}
        className="group block overflow-hidden rounded-[28px] border border-[#E8E2D9] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)]"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          {product.badge && (
            <span className="absolute left-5 top-5 z-10 rounded-full bg-[#C8A96A] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-black">
              {product.badge}
            </span>
          )}

          <img
            src={
              product.images?.[0]?.url ||
              "https://placehold.co/600x600?text=No+Image"
            }
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-2 text-xs uppercase tracking-[2px] text-[#C8A96A]">
            {product.category}
          </p>

          <h3 className="mb-3 line-clamp-1 font-serif text-2xl text-[#111111]">
            {product.name}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#666]">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mb-5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                className={
                  i < rating
                    ? "fill-[#C8A96A] text-[#C8A96A]"
                    : "text-gray-300"
                }
              />
            ))}

            <span className="ml-2 text-xs text-gray-500">
              ({reviewCount} {reviewCount === 1 ? "Review" : "Reviews"})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl font-semibold text-[#111111]">
              ₦{Number(product.price || 0).toLocaleString()}
            </span>

            <span className="text-sm font-medium text-[#C8A96A] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;