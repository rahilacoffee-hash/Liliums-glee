import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

import collectionsData, {
  productCategories,
} from "./collectionsData";

import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";

import { staggerContainer } from "./collectionsVariants";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/products");

      // Backend returns:
      // { success, message, data: { products, total, page, totalPages } }

      setProducts(data.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [products, activeCategory]);

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 uppercase tracking-[4px] text-[#C8A96A]">
            {collectionsData.eyebrow}
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            {collectionsData.title}{" "}
            <span className="text-[#C8A96A]">
              {collectionsData.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[#666]">
            {collectionsData.description}
          </p>
        </div>

        {/* Filter */}
        <div className="mt-16">
          <ProductFilter
            categories={productCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Products */}
        {loading ? (
          <div className="py-20 text-center">
            Loading products...
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#C8A96A] px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;