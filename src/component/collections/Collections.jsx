import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../../api/axiosInstance";

import ProductCard from "./ProductCard";
import productsData from "./collectionData";

function Collections() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const { data } = await axiosInstance.get("/products/featured");

      if (data.success) {
        setFeaturedProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 uppercase tracking-[4px] text-[#C8A96A]">
            {productsData.eyebrow}
          </p>

          <h2 className="font-serif text-5xl text-[#111111]">
            {productsData.title}{" "}
            <span className="text-[#C8A96A]">
              {productsData.highlight}
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#666]">
            {productsData.description}
          </p>
        </motion.div>

        {/* Loading */}

        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-lg text-gray-500">
              Loading featured products...
            </p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-lg text-gray-500">
              No featured products available.
            </p>
          </div>
        ) : (
          <>
            {/* Products */}

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product, index) => (
             <ProductCard
  key={product._id}
  product={product}
  index={index}
/>
              ))}
            </div>

            {/* Button */}

            <div className="mt-16 text-center">
              <a
                href={productsData.button.href}
                className="inline-flex items-center rounded-full bg-[#C8A96A] px-8 py-4 font-semibold text-black transition hover:scale-105"
              >
                {productsData.button.label}
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Collections;