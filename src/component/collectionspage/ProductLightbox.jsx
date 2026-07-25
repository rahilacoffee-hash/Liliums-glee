// ProductLightbox.jsx
import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function ProductLightbox({ images, activeImage, setActiveImage, onClose, productName }) {
  let goNext = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % images.length);
  }, [images.length, setActiveImage]);

  let goPrev = useCallback(() => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, setActiveImage]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111]/95 px-6 backdrop-blur-sm"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <span className="absolute left-6 top-6 text-sm tracking-wide text-white/60">
        {activeImage + 1} / {images.length}
      </span>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#C8A96A] hover:text-[#C8A96A] md:left-10"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <motion.img
        key={activeImage}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        src={images[activeImage].url}
        alt={`${productName} ${activeImage + 1}`}
        className="max-h-[75vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#C8A96A] hover:text-[#C8A96A] md:right-10"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-8 flex gap-3 overflow-x-auto"
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                activeImage === index ? "border-[#C8A96A]" : "border-white/20 opacity-60"
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ProductLightbox;