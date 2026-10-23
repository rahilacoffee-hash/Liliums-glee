import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Grid2X2, List } from "lucide-react";

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
  const [view, setView] = useState("grid");

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
        <div className="mt-12 flex flex-col items-center justify-between gap-5 lg:flex-row">
          <ProductFilter
            categories={productCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className="flex items-center rounded-xl border border-[#E7E1D7] bg-white p-1" aria-label="Product view">
            <button type="button" onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${view === "grid" ? "bg-[#111111] text-[#C8A96A]" : "text-[#666] hover:text-[#111]"}`}><Grid2X2 size={18} /></button>
            <button type="button" onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"} className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${view === "list" ? "bg-[#111111] text-[#C8A96A]" : "text-[#666] hover:text-[#111]"}`}><List size={19} /></button>
          </div>
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
            className={`mt-12 gap-8 ${view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col"}`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  view={view}
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
       
      </div>
    </section>
  );
}

export default FeaturedProducts;
