// ProductShowcase.jsx
// Replaces ProductGallery.jsx + ProductInfo.jsx — renders both columns as one
// composed, scroll-linked layout. Drop this into ProductDetailsPage.jsx in
// place of the old <ProductGallery /> + <ProductInfo /> grid.

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, ShoppingBag, Heart, Expand, Truck, ShieldCheck } from "lucide-react";
import ProductLightbox from "./ProductLightbox";
import ProductFilmstrip from "./ProductFilmstrip";

function ProductShowcase({ product, whyShop }) {
  let [activeImage, setActiveImage] = useState(0);
  let [wishlisted, setWishlisted] = useState(false);
  let [lightboxOpen, setLightboxOpen] = useState(false);
  let [quantity, setQuantity] = useState(1);
  let [openId, setOpenId] = useState(null);
  let [adding, setAdding] = useState(false);

  let images = product.images?.length
    ? product.images
    : [{ url: "https://placehold.co/900x1100?text=No+Image" }];

  // Each editorial "chapter" on the right is tied to an image index.
  // As a chapter scrolls to the center of the viewport, the pinned
  // panel on the left swaps to match it.
  let chapters = [
    { key: "overview", imageIndex: 0 },
    { key: "notes", imageIndex: images.length > 1 ? 1 : 0 },
    { key: "details", imageIndex: images.length > 2 ? 2 : 0 },
  ];

  function decrease() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function increase() {
    setQuantity((prev) => prev + 1);
  }

  async function addToCart() {
    try {
      setAdding(true);
      // POST /cart/add — wire to your actual cart endpoint
      await new Promise((r) => setTimeout(r, 500));
    } finally {
      setAdding(false);
    }
  }

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <div className="relative bg-[#F7F3EC]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          {/* ============ LEFT — pinned showroom panel ============ */}
          <div className="relative lg:sticky lg:top-0 lg:h-screen">
            <div className="relative h-[70vh] overflow-hidden bg-gradient-to-b from-[#4A141F] to-[#2E0C13] lg:h-full">
              {/* ambient texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
              </div>

              {/* curtain-wipe reveal on load */}
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 flex items-center justify-center p-10 lg:p-16"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onClick={() => setLightboxOpen(true)}
                    src={images[activeImage].url}
                    alt={product.name}
                    className="max-h-full max-w-full cursor-zoom-in rounded-sm object-contain shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                  />
                </AnimatePresence>
              </motion.div>

              {/* eyebrow, top-left */}
              <div className="absolute left-8 top-8 text-[11px] uppercase tracking-[3px] text-[#C9A768]/80">
                {product.category}
              </div>

              {/* expand */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#C9A768] hover:text-[#C9A768]"
              >
                <Expand size={15} />
              </button>

              {/* vertical dot rail — click to jump image manually */}
              <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className="group flex h-4 w-4 items-center justify-center"
                  >
                    <span
                      className={`rounded-full transition-all ${
                        activeImage === index
                          ? "h-2 w-2 bg-[#C9A768]"
                          : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* image counter, bottom-left */}
              <div className="absolute bottom-8 left-8 font-serif text-sm italic text-white/50">
                {String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* ============ RIGHT — scrolling spec sheet ============ */}
          <div className="px-6 py-16 lg:px-16 lg:py-24">
            {/* Chapter: Overview */}
            <motion.section
              onViewportEnter={() => setActiveImage(chapters[0].imageIndex)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              initial="hidden"
              whileInView="visible"
              viewport2={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.08 } },
              }}
              className="min-h-[60vh]"
            >
              <div className="mb-6 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < (product.rating || 5) ? "fill-[#C9A768] text-[#C9A768]" : "text-[#E6DED2]"
                    }
                  />
                ))}
                <span className="text-xs text-[#8B8078]">({product.reviews || 0} Reviews)</span>
              </div>

              <h1 className="font-serif text-5xl leading-[1.05] text-[#1C1512] md:text-6xl">
                {product.name}
              </h1>

              <p className="mt-3 font-serif text-2xl italic text-[#4A141F]">
                {product.subtitle || product.category}
              </p>

              <div className="my-8 h-px w-20 bg-[#4A141F]/20" />

              <p className="max-w-md text-[15px] leading-8 text-[#5A5049]">
                {product.description}
              </p>

              {/* price + order controls */}
              <div className="mt-10 flex flex-wrap items-center gap-5 border-y border-[#E6DED2] py-6">
                <span className="font-serif text-3xl text-[#1C1512]">{product.price}</span>

                <div className="flex items-center gap-5 rounded-full bg-white px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <button onClick={decrease} className="text-lg text-[#1C1512]">−</button>
                  <span className="w-4 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={increase} className="text-lg text-[#1C1512]">+</button>
                </div>

                <button
                  onClick={addToCart}
                  disabled={adding}
                  className="flex items-center gap-2 rounded-full bg-[#1C1512] px-8 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#4A141F] disabled:opacity-60"
                >
                  <ShoppingBag size={15} />
                  {adding ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  onClick={() => setWishlisted((prev) => !prev)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6DED2] transition hover:border-[#4A141F]"
                >
                  <Heart
                    size={16}
                    className={wishlisted ? "fill-[#4A141F] text-[#4A141F]" : "text-[#1C1512]"}
                  />
                </button>
              </div>
            </motion.section>

            {/* Chapter: Notes / whyShop */}
            <motion.section
              onViewportEnter={() => setActiveImage(chapters[1].imageIndex)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-[60vh] pt-20"
            >
              <p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#C9A768]">
                Why It's Worth It
              </p>
              <h2 className="mb-10 font-serif text-3xl text-[#1C1512]">The Details That Matter</h2>

              <div className="divide-y divide-[#E6DED2]">
                {whyShop.map((item) => {
                  let isOpen = openId === item.id;

                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => toggle(item.id)}
                        className="flex w-full items-center justify-between py-6 text-left"
                      >
                        <span className="font-serif text-lg text-[#1C1512]">{item.title}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className="text-[#4A141F]"
                        >
                          <Plus size={16} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 text-sm leading-7 text-[#8B8078]">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Chapter: Delivery / trust */}
            <motion.section
              onViewportEnter={() => setActiveImage(chapters[2].imageIndex)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-20"
            >
              <p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#C9A768]">
                Getting It To You
              </p>
              <h2 className="mb-10 font-serif text-3xl text-[#1C1512]">Delivery &amp; Care</h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-2xl border border-[#E6DED2] bg-white p-6">
                  <Truck size={18} className="mt-0.5 flex-shrink-0 text-[#4A141F]" />
                  <div>
                    <p className="font-medium text-[#1C1512]">Nationwide Delivery</p>
                    <p className="mt-1 text-sm text-[#8B8078]">Arrives in 3–7 working days, tracked door to door.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#E6DED2] bg-white p-6">
                  <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-[#4A141F]" />
                  <div>
                    <p className="font-medium text-[#1C1512]">Quality Guaranteed</p>
                    <p className="mt-1 text-sm text-[#8B8078]">Handmade and inspected before it ever leaves us.</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <ProductFilmstrip images={images} activeImage={activeImage} onSelect={setActiveImage} onExpand={() => setLightboxOpen(true)} />

      {/* Sticky mobile cart bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-[#E6DED2] bg-white px-6 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="flex items-center gap-4 rounded-full bg-[#F7F3EC] px-4 py-2.5">
          <button onClick={decrease} className="text-lg text-[#1C1512]">−</button>
          <span className="w-4 text-center font-medium">{quantity}</span>
          <button onClick={increase} className="text-lg text-[#1C1512]">+</button>
        </div>

        <button
          onClick={addToCart}
          disabled={adding}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C1512] py-3.5 font-medium text-white disabled:opacity-60"
        >
          <ShoppingBag size={16} />
          {adding ? "Adding..." : `Add to Cart — ${product.price}`}
        </button>
      </div>

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

export default ProductShowcase;