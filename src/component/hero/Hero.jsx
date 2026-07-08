import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { heroSlides } from "./heroData";
import { containerVariants } from "./heroVariants";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import CarouselControls from "./CarouselControls";

function Hero() {
  const [current, setCurrent] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const slide = heroSlides[current];

  const goToSlide = useCallback((index) => {
    setActiveHotspot(null);
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveHotspot(null);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveHotspot(null);
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const toggleHotspot = (id) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  };

  // Auto Play
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <motion.section
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex min-h-screen flex-col md:flex-row">
        <HeroContent slide={slide} />

        <HeroImage
          slide={slide}
          activeHotspot={activeHotspot}
          onToggleHotspot={toggleHotspot}
          slideCount={heroSlides.length}
          current={current}
          onSelectSlide={goToSlide}
        />

        <CarouselControls
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </motion.section>
  );
}

export default Hero;