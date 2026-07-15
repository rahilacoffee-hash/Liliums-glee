import { motion } from "framer-motion";

function ProductFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <motion.button
            key={category}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setActiveCategory(category)}
            className={`
              rounded-full
              border
              px-6
              py-3
              text-sm
              font-medium
              uppercase
              tracking-[2px]
              transition-all
              duration-300

              ${
                active
                  ? `
                    border-[#C8A96A]
                    bg-[#111111]
                    text-[#C8A96A]
                    shadow-lg
                  `
                  : `
                    border-[#E7E1D7]
                    bg-white
                    text-[#666666]
                    hover:border-[#C8A96A]
                    hover:text-[#111111]
                    hover:shadow-md
                  `
              }
            `}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}

export default ProductFilter;