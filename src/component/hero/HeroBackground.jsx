
import { motion } from "framer-motion";

function HeroBackground({ image, alt, reduceMotion }) {
  return (
    <div className="absolute inset-0">
      <motion.img
        src={image || "/images/liliums-hero.png"}
        alt={alt || "Luxury modern interior"}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeOut",
        }}
        className="h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#120a06]/20" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#130b07]/60 via-[#130b07]/15 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#120a06]/65 via-transparent to-[#120a06]/25" />
    </div>
  );
}

export default HeroBackground;
