
import { motion } from "framer-motion";
import { backgroundZoom, decorativeGlow } from "./heroVariants";

function HeroBackground({ hero }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.img
        src={hero.backgroundImage || "/images/liliums-hero.png"}
        alt="Luxury modern interior designed by Liliums Gleee"
        variants={backgroundZoom}
        initial="initial"
        animate="animate"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic contrast */}
      <div className="absolute inset-0 bg-[#100B07]/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#100B07]/75 via-[#100B07]/35 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#100B07]/75 via-transparent to-[#100B07]/20" />

      {/* Subtle architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]
        bg-[linear-gradient(#F5E9D8_1px,transparent_1px),linear-gradient(90deg,#F5E9D8_1px,transparent_1px)]
        [background-size:80px_80px]"
      />

      {/* Warm ambient lighting */}
      <motion.div
        variants={decorativeGlow}
        animate="animate"
        className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[#C8A477]/15 blur-[150px]"
      />

      <motion.div
        variants={decorativeGlow}
        animate="animate"
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C8A477]/10 blur-[160px]"
      />
    </div>
  );
}

export default HeroBackground;
