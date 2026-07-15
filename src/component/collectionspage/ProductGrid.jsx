import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeUp,
  productCard,
} from "./collectionsVariants";

function ProductGrid() {
  const { products } = collectionsData;

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">
        {/* ================= Header ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
            >
              Featured Products
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
            >
              Discover Pieces
              <br />
              Designed To Inspire.
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg leading-9 text-[#666666]"
          >
            Every product is carefully selected to blend timeless design,
            premium craftsmanship, and everyday functionality.
          </motion.p>
        </motion.div>

        {/* ================= Products ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={productCard}
              whileHover="whileHover"
              className="group overflow-hidden rounded-[30px] bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Badge */}

                <span className="absolute left-6 top-6 rounded-full bg-[#C8A96A] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#111111]">
                  {product.badge}
                </span>

                {/* Category */}

                <span className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[2px] text-white backdrop-blur-xl">
                  {product.category}
                </span>
              </div>

              {/* Content */}

              <div className="p-8">
                <h3 className="font-serif text-2xl text-[#111111]">
                  {product.name}
                </h3>

                <p className="mt-4 text-3xl font-light text-[#C8A96A]">
                  {product.price}
                </p>

                {/* Buttons */}

                <div className="mt-8 flex items-center justify-between">
                  <Link
                    to={`/products/${product.id}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[2px] text-[#111111]"
                  >
                    View Details

                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                    />
                  </Link>

                  <button
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#111111]
                      text-white
                      transition-all
                      duration-300
                      hover:bg-[#C8A96A]
                      hover:text-[#111111]
                    "
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ================= View All ================= */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link
            to="/collections"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C8A96A]
              px-8
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-[2px]
              text-[#111111]
              transition-all
              duration-300
              hover:bg-[#C8A96A]
            "
          >
            View All Products

            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductGrid;