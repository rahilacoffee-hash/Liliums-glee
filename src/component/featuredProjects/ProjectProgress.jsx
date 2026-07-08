import { motion } from "framer-motion";

function ProjectProgress({ current, total, onSelect }) {
  return (
    <div className="mt-20 flex items-center justify-center gap-8">
      {/* Current */}
     

      {/* Timeline */}
      <div className="flex-1 max-w-xl">
        <div className="relative h-[3px] overflow-hidden rounded-full bg-[#d7d1c7]">
          <motion.div
            key={current}
            className="absolute left-0 top-0 h-full bg-[#C8A96A]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 5,
              ease: "linear",
            }}
          />
        </div>

        {/* Invisible Click Areas */}
        <div className="absolute mt-[-3px] flex h-6 w-full">
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className="flex-1"
            />
          ))}
        </div>
      </div>

     
    </div>
  );
}

export default ProjectProgress;