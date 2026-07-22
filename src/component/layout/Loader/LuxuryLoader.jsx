import { motion } from "framer-motion";

function LuxuryLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5F0]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="flex h-28 w-28 items-center justify-center rounded-full border border-[#D7BE8A]"
      >
        {/* Logo */}
        <motion.h1
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="font-serif text-4xl italic text-[#C8A96A]"
        >
          L
        </motion.h1>
      </motion.div>

      {/* Brand */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 font-serif text-2xl tracking-[6px] text-[#111111]"
      >
        LILIUM'S GLEE
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="mt-3 text-sm tracking-[2px] text-gray-500"
      >
        Crafting Timeless Interiors
      </motion.p>

      {/* Gold Dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: item * 0.2,
            }}
            className="h-2 w-2 rounded-full bg-[#C8A96A]"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default LuxuryLoader;