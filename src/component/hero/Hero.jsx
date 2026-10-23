
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import { defaultHero } from "./heroSlides";

function Hero() {
  const [hero, setHero] = useState(defaultHero);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    async function fetchHero() {
      try {
        const { data } = await axiosInstance.get("/site-content");

        if (!mounted || !data.success || !data.data?.hero) return;

        const remoteHero = data.data.hero;

        setHero({
          ...defaultHero,
          ...remoteHero,
          title: remoteHero.title || "LILIUMS",
          scriptTitle: remoteHero.scriptTitle || "Gleee",
          eyebrow: remoteHero.eyebrow || "INTERIOR DESIGN",
          description:
            remoteHero.description ||
            "Thoughtfully designed interiors. Timeless materials. A new standard of modern luxury.",
          backgroundImage:
            remoteHero.backgroundImage || defaultHero.backgroundImage,
          primaryButton: {
            ...defaultHero.primaryButton,
            ...remoteHero.primaryButton,
          },
          secondaryButton: {
            ...defaultHero.secondaryButton,
            ...remoteHero.secondaryButton,
          },
        });
      } catch (error) {
        console.error("Failed to load hero content:", error);
      }
    }

    fetchHero();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#120c08] text-[#fff8ed]">
      <HeroBackground
        image={hero.backgroundImage}
        alt="Liliums Gleee luxury interior design"
        reduceMotion={reduceMotion}
      />

      <HeroContent hero={hero} reduceMotion={reduceMotion} />
    </section>
  );
}

export default Hero;
