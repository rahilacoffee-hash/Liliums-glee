// ProductGallery.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";

function ProductGallery({ product }) {
  let [activeImage, setActiveImage] = useState(0);
  let [wishlisted, setWishlisted] = useState(false);

  let images = product.images?.length
    ? product.images
    : [{ url: "https://placehold.co/800x800?text=No+Image" }];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-4"
    >
      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-[32px] border border-[#E8E2D9] bg-[#F8F5F0]">
        {product.badge && (
          <span className="absolute left-6 top-6 z-10 rounded-full bg-[#C8A96A] px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-black">
            {product.badge}
          </span>
        )}

        {/* Floating price card */}
        <div className="absolute right-6 top-6 z-10 flex flex-col items-center gap-3 rounded-2xl bg-[#111111] px-6 py-5 text-white shadow-xl">
          <span className="font-serif text-xl leading-none">{product.price}</span>

          <button
            onClick={() => setWishlisted((prev) => !prev)}
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-[#C8A96A]"
          >
            <Heart
              size={16}
              className={wishlisted ? "fill-[#C8A96A] text-[#C8A96A]" : "text-white"}
            />
          </button>
        </div>

        <div className="aspect-square overflow-hidden">
          <img
            src={images[activeImage].url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Bottom feature strip */}
        <div className="grid grid-cols-3 divide-x divide-[#E8E2D9] border-t border-[#E8E2D9] bg-white text-center">
          <div className="px-4 py-5">
            <p className="text-xs font-medium text-[#111111]">Natural Materials</p>
          </div>
          <div className="px-4 py-5">
            <p className="text-xs font-medium text-[#111111]">Long Lasting</p>
          </div>
          <div className="px-4 py-5">
            <p className="text-xs font-medium text-[#111111]">Handmade Finish</p>
          </div>
        </div>
      </div>

      {/* Vertical thumbnail rail */}
      {images.length > 1 && (
        <div className="flex w-24 flex-col items-center gap-4 rounded-full border border-[#E8E2D9] bg-[#F8F5F0] py-6">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-14 w-14 overflow-hidden rounded-full border-2 transition ${
                activeImage === index ? "border-[#C8A96A]" : "border-transparent"
              }`}
            >
              <img
                src={img.url}
                alt={`${product.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}

          <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A96A] text-black">
            <ArrowDown size={16} />
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ProductGallery;