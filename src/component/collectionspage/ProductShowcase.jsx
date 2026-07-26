import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import ProductFilmstrip from "./ProductFilmstrip";
import ProductLightbox from "./ProductLightbox";

function ProductShowcase({ product, whyShop }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openId, setOpenId] = useState(null);

  const images = product.images?.length ? product.images : [];
  const hasImages = images.length > 0;
  const activeImageData = images[activeImage];

  function changeQuantity(change) {
    setQuantity((current) => Math.max(1, current + change));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to basket`);
  }

  return (
    <>
      <section className="relative bg-[#F7F3EC]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="relative lg:sticky lg:top-0 lg:h-screen">
            <div className="relative flex h-[68vh] min-h-[520px] items-center justify-center overflow-hidden bg-[#35131b] p-8 sm:p-12 lg:h-full lg:p-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(201,167,104,.28),transparent_35%),radial-gradient(circle_at_75%_85%,rgba(255,255,255,.09),transparent_30%)]" />
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    onClick={() => setLightboxOpen(true)}
                    src={activeImageData.url}
                    alt={product.name}
                    className="relative max-h-full max-w-full cursor-zoom-in object-contain shadow-[0_32px_70px_rgba(0,0,0,.38)]"
                  />
                </AnimatePresence>
              ) : (
                <p className="relative text-sm uppercase tracking-[3px] text-white/50">Product image coming soon</p>
              )}

              <p className="absolute left-7 top-7 text-[10px] uppercase tracking-[3px] text-[#D4B276] sm:left-8 sm:top-8">{product.category}</p>
              {product.badge && <span className="absolute bottom-7 left-7 rounded-full border border-[#D4B276]/50 px-3 py-1 text-[10px] uppercase tracking-[2px] text-[#E7CF9C] sm:left-8 sm:bottom-8">{product.badge}</span>}
              {hasImages && (
                <button onClick={() => setLightboxOpen(true)} aria-label="Expand product image" className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#D4B276] hover:text-[#D4B276] sm:right-8 sm:top-8">
                  <Expand size={16} />
                </button>
              )}
              {images.length > 1 && <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">{images.map((_, index) => <button key={index} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`} className="p-1"><span className={`block rounded-full transition-all ${activeImage === index ? "h-2 w-2 bg-[#D4B276]" : "h-1.5 w-1.5 bg-white/35 hover:bg-white/75"}`} /></button>)}</div>}
              {hasImages && <p className="absolute bottom-8 right-8 font-serif text-sm italic text-white/55">{String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>}
            </div>
          </div>

          <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <section>
              <div className="mb-6 flex items-center gap-2">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} className={index < Math.round(product.rating || 0) ? "fill-[#C9A768] text-[#C9A768]" : "text-[#DED4CA]"} />)}<span className="text-xs text-[#8B8078]">({product.numReviews} reviews)</span></div>
              <h1 className="font-serif text-5xl leading-[1.04] text-[#1C1512] md:text-6xl">{product.name}</h1>
              <div className="my-8 h-px w-20 bg-[#4A141F]/20" />
              <p className="max-w-md text-[15px] leading-8 text-[#5A5049]">{product.description}</p>

              <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-[#E6DED2] py-6">
                <span className="mr-auto font-serif text-3xl text-[#1C1512]">{product.priceLabel}</span>
                <div className="flex items-center gap-4 rounded-full bg-white px-4 py-2.5 shadow-sm"><button onClick={() => changeQuantity(-1)} aria-label="Decrease quantity"><Minus size={16} /></button><span className="w-4 text-center text-sm font-medium">{quantity}</span><button onClick={() => changeQuantity(1)} aria-label="Increase quantity"><Plus size={16} /></button></div>
                <button onClick={handleAddToCart} className="flex items-center gap-2 rounded-full bg-[#1C1512] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#4A141F]"><ShoppingBag size={15} />Add to Cart</button>
                <button onClick={() => setWishlisted((value) => !value)} aria-label="Save product" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6DED2] transition hover:border-[#4A141F]"><Heart size={16} className={wishlisted ? "fill-[#4A141F] text-[#4A141F]" : "text-[#1C1512]"} /></button>
              </div>
            </section>

            <section className="pt-20"><p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#C9A768]">The Liliums Glee promise</p><h2 className="mb-8 font-serif text-3xl text-[#1C1512]">The details that matter</h2><div className="divide-y divide-[#E6DED2]">{whyShop.map((item) => { const open = openId === item.id; return <div key={item.id}><button onClick={() => setOpenId(open ? null : item.id)} className="flex w-full items-center justify-between py-5 text-left"><span className="font-serif text-lg text-[#1C1512]">{item.title}</span><Plus size={16} className={`text-[#4A141F] transition-transform ${open ? "rotate-45" : ""}`} /></button><AnimatePresence initial={false}>{open && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-sm leading-7 text-[#8B8078]">{item.description}</motion.p>}</AnimatePresence></div>; })}</div></section>

            <section className="pt-20"><p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#C9A768]">Getting it to you</p><h2 className="mb-8 font-serif text-3xl text-[#1C1512]">Delivery &amp; care</h2><div className="grid gap-5 sm:grid-cols-2"><div className="flex gap-4 rounded-2xl border border-[#E6DED2] bg-white p-5"><Truck size={18} className="mt-0.5 shrink-0 text-[#4A141F]" /><p className="text-sm leading-6 text-[#5A5049]"><strong className="block text-[#1C1512]">Nationwide delivery</strong>Tracked delivery across Nigeria in 3–7 working days.</p></div><div className="flex gap-4 rounded-2xl border border-[#E6DED2] bg-white p-5"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#4A141F]" /><p className="text-sm leading-6 text-[#5A5049]"><strong className="block text-[#1C1512]">Quality assured</strong>Each product is inspected before it leaves our studio.</p></div></div></section>
          </div>
        </div>
      </section>

      <ProductFilmstrip images={images} activeImage={activeImage} onSelect={setActiveImage} onExpand={() => setLightboxOpen(true)} />

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[#E6DED2] bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,.06)] lg:hidden"><div className="flex items-center gap-3 rounded-full bg-[#F7F3EC] px-3 py-2"><button onClick={() => changeQuantity(-1)} aria-label="Decrease quantity"><Minus size={15} /></button><span className="w-4 text-center text-sm">{quantity}</span><button onClick={() => changeQuantity(1)} aria-label="Increase quantity"><Plus size={15} /></button></div><button onClick={handleAddToCart} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C1512] py-3 text-sm font-medium text-white"><ShoppingBag size={16} />Add — {product.priceLabel}</button></div>

      <AnimatePresence>{lightboxOpen && hasImages && <ProductLightbox images={images} activeImage={activeImage} setActiveImage={setActiveImage} onClose={() => setLightboxOpen(false)} productName={product.name} />}</AnimatePresence>
    </>
  );
}

export default ProductShowcase;
