import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  staggerContainer,
  fadeUp,
} from "./collectionsVariants";

import {
  featuredProducts,
  productCategories,
} from "../collections/collectionData";

import ProductFilter from "../collections/ProductFilter";

function CategorySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return featuredProducts;
    }

    return featuredProducts.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">
        {/* ================= Header ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            Signature Collections
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            Curated Products
            <br />
            For Every Interior.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            Discover premium wallpapers, curtains, lighting, furniture,
            wall treatments and luxury décor for beautiful spaces.
          </motion.p>
        </motion.div>

        {/* ================= Product Filter ================= */}

        <ProductFilter
          categories={productCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* ================= Products ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProducts.map((product) => (
            <div key={product.id}>
              {/* Replace with your ProductCard */}
              {/* <ProductCard product={product} /> */}

              <div className="rounded-3xl border border-[#E6E1D8] bg-white p-8">
                <h3 className="font-serif text-2xl">{product.name}</h3>
                <p className="mt-3 text-[#666666]">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CategorySection;