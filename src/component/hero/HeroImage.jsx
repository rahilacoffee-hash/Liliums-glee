import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { imageVariants } from "./heroVariants";
import Hotspot from "./Hotspot";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

function HeroImage({ slide, activeHotspot, onToggleHotspot, slideCount, current, onSelectSlide }) {
  let activeSpot = slide.hotspots.find((spot) => spot.id === activeHotspot);

  return (
    <div className="relative w-full overflow-hidden lg:w-[58%]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b22]/80 via-transparent to-transparent" />
    <AnimatePresence mode="wait">
  <motion.img
    key={slide.id}
    src={slide.image}
    alt={slide.eyebrow}
    variants={imageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="absolute inset-0 h-full w-full object-cover"
  />
</AnimatePresence>

{/* Overlay */}
<div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0d2b22]/75 via-transparent to-transparent" />

<div className="absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-black/50 to-transparent" />
    

      {slide.hotspots.map((spot) => (
        <Hotspot
          key={spot.id}
          x={spot.x}
          y={spot.y}
          isActive={activeHotspot === spot.id}
          onToggle={() => onToggleHotspot(spot.id)}
        />
      ))}

      <AnimatePresence>
        {activeSpot && (
          <ProductCard
            key={activeSpot.id}
            x={activeSpot.x}
            y={activeSpot.y}
            product={activeSpot.product}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 z-20">
        <Pagination count={slideCount} current={current} onSelect={onSelectSlide} />
      </div>
    </div>
  );
}

export default HeroImage;