import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { productCardVariants } from "./heroVariants";

function ProductCard({ x, y, product }) {
  return (
    <motion.div
      variants={productCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-20 w-72 -translate-x-1/2 translate-y-4 rounded-xl border border-white/10 bg-black/70 p-3 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-white line-clamp-2">
            {product.name}
          </p>
          <p className="truncate text-xs text-white/50">{product.detail}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-white/80">
          Price: <span className="font-semibold text-[#D6A354]">{product.price}</span>
        </span>
        <button className="flex items-center gap-1.5 rounded-full bg-[#D6A354] px-3 py-1.5 text-xs font-semibold text-black transition hover:scale-105">
          <ShoppingCart size={12} />
          Add to basket
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;