import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";

function ProductGallery({ product }) {
  // Works whether the backend sends `images` (array, multiple angles) or
  // the older single `image` field - normalizes to one array either way
  let images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : [];

  let [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[32px] border border-[#E8E2D9] bg-[#F8F5F0] text-sm text-[#999]">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">

      {/* Thumbnails - different angles */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto md:w-20 md:flex-col md:overflow-y-auto md:overflow-x-visible">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                activeIndex === i ? "border-[#C8A96A]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${product.name} - angle ${i + 1}`}
                className="h-16 w-16 object-cover md:h-20 md:w-20"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-[32px] border border-[#E8E2D9] bg-[#F8F5F0]">
        {product.badge && (
          <span className="absolute left-6 top-6 z-10 rounded-full bg-[#C8A96A] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-black">
            {product.badge}
          </span>
        )}

        <span className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#111111] backdrop-blur-sm">
          <ZoomIn size={16} />
        </span>

        <div className="aspect-square w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </AnimatePresence>
        </div>

        {/* Dots for mobile, where the thumbnail strip is less convenient */}
        {images.length > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === i ? "w-5 bg-[#C8A96A]" : "w-1.5 bg-black/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;