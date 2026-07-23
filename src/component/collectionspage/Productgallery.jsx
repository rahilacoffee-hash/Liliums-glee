// ProductGallery.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowDown, Flower2 } from "lucide-react";

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
      <div className="relative flex-1">
        {/* Arch-topped image frame */}
        <div className="relative overflow-hidden rounded-t-[160px] rounded-b-[32px] border border-[#E8E2D9] bg-[#F8F5F0]">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={images[activeImage].url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating price card */}
          <div className="absolute right-6 top-6 z-10 flex flex-col items-center gap-3 rounded-2xl bg-[#111111] px-6 py-5 text-white shadow-xl">
            <span className="text-sm font-medium leading-tight">{product.price}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/60">USD</span>

            <div className="h-px w-6 bg-white/20" />

            <button
              onClick={() => setWishlisted((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center"
            >
              <Heart
                size={16}
                className={wishlisted ? "fill-[#C8A96A] text-[#C8A96A]" : "text-white"}
              />
            </button>
          </div>
        </div>

        {/* Circular badge, overlapping top-left */}
        <div className="absolute -left-4 top-10 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#E8E2D9] bg-white text-center shadow-md">
          <Flower2 size={16} className="mb-1 text-[#C8A96A]" />
          <span className="text-[10px] font-medium leading-tight text-[#111111]">
            Hand
            <br />
            Poured
          </span>
        </div>

        {/* Feature pill, overlapping bottom */}
        <div className="absolute -bottom-8 left-6 right-6 z-10 grid grid-cols-3 divide-x divide-[#E8E2D9] rounded-full border border-[#E8E2D9] bg-white px-4 py-5 shadow-md">
          <div className="flex flex-col items-center gap-2 px-2 text-center">
            <span className="text-lg">🌿</span>
            <p className="text-xs font-medium leading-tight text-[#111111]">
              Natural
              <br />
              Ingredients
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 px-2 text-center">
            <span className="text-lg">〰️</span>
            <p className="text-xs font-medium leading-tight text-[#111111]">
              Long Lasting
              <br />
              Aroma
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 px-2 text-center">
            <Heart size={16} className="text-[#111111]" />
            <p className="text-xs font-medium leading-tight text-[#111111]">
              Handmade
              <br />
              with Love
            </p>
          </div>
        </div>
      </div>

      {/* Vertical thumbnail rail */}
      {images.length > 1 && (
        <div className="relative flex w-24 flex-col items-center gap-4 rounded-full border border-[#E8E2D9] bg-[#F8F5F0] py-6">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-transparent transition"
            >
              <img
                src={img.url}
                alt={`${product.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {activeImage === index && (
                <span className="absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#111111]" />
              )}
            </button>
          ))}

          <div className="my-2 h-16 w-px bg-[#E8E2D9]" />

          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A96A] text-black transition hover:-translate-y-0.5">
            <ArrowDown size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default ProductGallery;