
import { useCallback, useEffect, useMemo, useState } from "react";
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

function FeaturedProducts({ featuredOnly = true }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState("grid");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(
        featuredOnly ? "/products/featured" : "/products",
        featuredOnly ? undefined : { params: { limit: 100 } }
      );

      const responseData = response.data;

      // Supports both:
      // { success: true, data: [...] }
      // { success: true, data: { products: [...] } }
      const productList = Array.isArray(responseData?.data)
        ? responseData.data
        : responseData?.data?.products;

      if (!Array.isArray(productList)) {
        throw new Error("The server returned an unexpected products format.");
      }

      setProducts(productList);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load products. Please try again."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [featuredOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => {
      const category =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      return category === activeCategory;
    });
  }, [products, activeCategory]);

  const heading = featuredOnly ? "Featured" : collectionsData.title;

  return (
    <section className="overflow-hidden bg-[#F8F5F0] py-14 sm:py-20 md:py-28">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[3px] text-[#C8A96A] sm:text-xs sm:tracking-[4px]">
            {collectionsData.eyebrow}
          </p>

          <h2 className="font-serif text-3xl leading-tight text-[#171717] sm:text-4xl md:text-5xl">
            {heading}{" "}
            <span className="text-[#C8A96A]">
              {collectionsData.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#666] sm:mt-6 sm:text-base">
            {collectionsData.description}
          </p>
        </div>

        {/* Filters and view toggle */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-full">
            <ProductFilter
              categories={productCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <div
            className="flex shrink-0 self-center items-center rounded-xl border border-[#E7E1D7] bg-white p-1 lg:self-auto"
            aria-label="Product view"
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-[#111111] text-[#C8A96A]"
                  : "text-[#666] hover:text-[#111]"
              }`}
            >
              <Grid2X2 size={17} />
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                view === "list"
                  ? "bg-[#111111] text-[#C8A96A]"
                  : "text-[#666] hover:text-[#111]"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div
            className="grid grid-cols-2 gap-3 py-10 sm:gap-5 sm:py-16 lg:grid-cols-3"
            aria-live="polite"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl bg-white"
              >
                <div className="aspect-square bg-[#EAE4DA]" />
                <div className="space-y-3 p-3 sm:p-5">
                  <div className="h-3 w-1/3 rounded bg-[#EAE4DA]" />
                  <div className="h-4 w-4/5 rounded bg-[#EAE4DA]" />
                  <div className="h-4 w-1/2 rounded bg-[#EAE4DA]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-14 text-center sm:py-20">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchProducts}
              className="mt-5 rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#333]"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key={view}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className={`mt-8 sm:mt-12 ${
              view === "grid"
                ? "grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7"
                : "flex flex-col gap-3 sm:gap-5"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product._id || product.id || product.slug || index}
                product={product}
                view={view}
              />
            ))}
          </motion.div>
        ) : (
          <div className="py-14 text-center sm:py-20">
            <p className="font-serif text-xl text-[#171717]">
              No products found
            </p>
            <p className="mt-2 text-sm text-[#777]">
              Try selecting another category.
            </p>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-5 text-sm font-semibold text-[#9A783D] underline underline-offset-4"
              >
                View all products
              </button>
            )}
          </div>
        )}

        {/* View all products */}
        {featuredOnly && !loading && !error && (
          <div className="mt-10 text-center sm:mt-16">
            <Link
              to="/marketplace"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-[#D4B779] sm:px-8 sm:text-base"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
