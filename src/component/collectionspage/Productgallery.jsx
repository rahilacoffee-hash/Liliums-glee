import { motion } from "framer-motion";

function ProductGallery({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[32px] border border-[#E8E2D9] bg-[#F8F5F0]"
    >
      {product.badge && (
        <span className="absolute left-6 top-6 z-10 rounded-full bg-[#C8A96A] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-black">
          {product.badge}
        </span>
      )}

      <div className="aspect-square overflow-hidden">
        <img
          src={
            product.images?.length
              ? product.images[0].url
              : "https://placehold.co/800x800?text=No+Image"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

export default ProductGallery;