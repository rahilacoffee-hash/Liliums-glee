import { motion } from "framer-motion";

import { filterButton } from "./collectionsVariants";

function ProductFilter({
  categories = [],
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <motion.button
            key={category}
            variants={filterButton}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
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
                isActive
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