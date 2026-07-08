import { motion } from "framer-motion";
import { philosophy } from "./philosophyData";
import { imageReveal } from "./philosophyVariants";

function PhilosophyImage() {
  return (
    <motion.div
      className="flex-1 overflow-hidden rounded-[32px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={imageReveal}
    >
      <motion.img
        src={philosophy.image}
        alt=""
        className="h-[700px] w-full object-cover"
        whileInView={{
          scale: [1, 1.05],
        }}
        transition={{
          duration: 18,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

export default PhilosophyImage;