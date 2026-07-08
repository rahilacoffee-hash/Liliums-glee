import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { philosophy } from "./philosophyData";
import { fadeUp } from "./philosophyVariants";

function PhilosophyContent() {
  return (
    
    <motion.div
      className="flex-1 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      
    >
      <p className="mb-5 uppercase tracking-[4px] text-[#B58A45]">
        {philosophy.eyebrow}
      </p>

      <h2 className="font-serif text-5xl leading-tight text-[#1B1B1B]">
        {philosophy.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mt-8 max-w-lg leading-8 text-gray-600">
        {philosophy.description}
      </p>

      <button className="group mt-10 flex items-center gap-3 text-[#1B1B1B]">
        {philosophy.button}

        <ArrowRight
          className="transition-transform duration-300 group-hover:translate-x-2"
          size={18}
        />
      </button>
    </motion.div>
  );
}

export default PhilosophyContent;