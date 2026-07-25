// ProductGallery.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Expand, Flower2 } from "lucide-react";
import ProductLightbox from "./ProductLightbox";

function ProductGallery({ product }) {
  let [activeImage, setActiveImage] = useState(0);
  let [wishlisted, setWishlisted] = useState(false);
  let [lightboxOpen, setLightboxOpen] = useState(false);
  let [isZooming, setIsZooming] = useState(false);
  let [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  let frameRef = useRef(null);

  let images = product.images?.length
    ? product.images
    : [{ url: "https://placehold.co/900x1100?text=No+Image" }];

  function handleMouseMove(e) {
    let rect = frameRef.current.getBoundingClientRect();

    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-4"
      >
        <div className="relative flex-1">
          {/* Arch-topped image frame with zoom */}
          <div
            ref={frameRef}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightboxOpen(true)}
            className="group relative cursor-zoom-in overflow-hidden rounded-t-[160px] rounded-b-[32px] border border-[#E8E2D9] bg-[#F8F5F0]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={images[activeImage].url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Magnifier overlay */}
            <AnimatePresence>
              {isZooming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 hidden lg:block"
                  style={{
                    backgroundImage: `url(${images[activeImage].url})`,
                    backgroundSize: "220%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Expand hint */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-[#111111] opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Expand size={13} />
              View full size
            </div>

            {/* Floating price card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-6 top-6 z-10 flex flex-col items-center gap-3 rounded-2xl bg-[#111111] px-6 py-5 text-white shadow-xl"
            >
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

          {/* Circular badge */}
          <div className="absolute -left-4 top-10 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#E8E2D9] bg-white text-center shadow-md">
            <Flower2 size={16} className="mb-1 text-[#C8A96A]" />
            <span className="text-[10px] font-medium leading-tight text-[#111111]">
              Hand
              <br />
              Poured
            </span>
          </div>

          {/* Feature pill */}
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

            <button
              onClick={() => setLightboxOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A96A] text-black transition hover:-translate-y-0.5"
            >
              <Expand size={16} />
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <ProductLightbox
            images={images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            onClose={() => setLightboxOpen(false)}
            productName={product.name}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductGallery;