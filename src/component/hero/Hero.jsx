import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import SlideCounter from "./SlideCounter";
import heroSlides from "./heroSlides";

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [homeHero, setHomeHero] = useState(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => { let active = true; axiosInstance.get("/site-content").then(({ data }) => { if (active && data.success) setHomeHero(data.data.hero); }).catch(() => {}); return () => { active = false; }; }, []);
  useEffect(() => { if (reduceMotion) return undefined; const interval = window.setInterval(() => setActiveIndex((index) => (index + 1) % heroSlides.length), 6000); return () => window.clearInterval(interval); }, [reduceMotion]);
  const handlePointerMove = (event) => { if (reduceMotion) return; setOffset({ x: (event.clientX / window.innerWidth - 0.5) * 12, y: (event.clientY / window.innerHeight - 0.5) * 8 }); };
  const slides = homeHero ? [{ ...heroSlides[0], image: homeHero.backgroundImage || heroSlides[0].image, alt: homeHero.title || heroSlides[0].alt, cardLabel: homeHero.featuredCollection?.eyebrow || homeHero.featuredCollection?.badge, title: homeHero.featuredCollection?.title || heroSlides[0].title, description: homeHero.description, location: homeHero.featuredCollection?.location || heroSlides[0].location, area: homeHero.featuredCollection?.area || heroSlides[0].area, year: homeHero.featuredCollection?.year || heroSlides[0].year, href: homeHero.featuredCollection?.button?.href || heroSlides[0].href, tagline: homeHero.title }, ...heroSlides.slice(1)] : heroSlides;
  const slide = slides[activeIndex % slides.length];
  return <section onPointerMove={handlePointerMove} className="relative isolate h-screen min-h-[700px] overflow-hidden bg-[#17110D] text-[#F7EBDD]"><HeroBackground slide={slide} offset={offset} reduceMotion={reduceMotion} /><HeroContent slide={slide} offset={offset} reduceMotion={reduceMotion} /><SlideCounter current={activeIndex} total={slides.length} reduceMotion={reduceMotion} /></section>;
}
export default Hero;
