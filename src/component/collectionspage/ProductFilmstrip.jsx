// ProductFilmstrip.jsx
// Full-width horizontal gallery strip beneath the showcase — drag or scroll
// through every product image, click any frame to open the lightbox there.

import { motion } from "framer-motion";

function ProductFilmstrip({ images, activeImage, onSelect, onExpand }) {
  if (images.length < 2) return null;

  return (
    <section className="border-t border-[#E6DED2] bg-[#F7F3EC] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <p className="mb-8 text-[11px] uppercase tracking-[3px] text-[#C9A768]">Full Gallery</p>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {images.map((img, index) => (
            <motion.button
              key={index}
              onClick={() => {
                onSelect(index);
                onExpand();
              }}
              whileHover={{ y: -4 }}
              className={`relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-xl border transition sm:h-56 sm:w-44 ${
                activeImage === index ? "border-[#4A141F]" : "border-[#E6DED2]"
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
              {activeImage === index && (
                <span className="absolute inset-0 bg-[#4A141F]/10" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductFilmstrip;