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