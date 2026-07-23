// ProductInfo.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus, ShoppingBag } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

function ProductInfo({ product, whyShop }) {
  let [quantity, setQuantity] = useState(1);
  let [openId, setOpenId] = useState(null);
  let [adding, setAdding] = useState(false);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function decrease() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function increase() {
    setQuantity((prev) => prev + 1);
  }

  async function addToCart() {
    try {
      setAdding(true);

      let { data } = await axiosInstance.post("/cart/add", {
        productId: product._id,
        quantity,
      });

      if (data.success) {
        alert("Added to cart");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to add to cart");
    } finally {
      setAdding(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center"
    >
      {/* Rating */}
      <div className="mb-5 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < (product.rating || 5) ? "fill-[#C8A96A] text-[#C8A96A]" : "text-[#E8E2D9]"}
          />
        ))}

        <span className="text-sm text-[#777]">({product.reviews || 0} Reviews)</span>
      </div>

      {/* Title */}
      <h1 className="mb-2 font-serif text-4xl leading-tight text-[#111111] md:text-5xl">
        {product.name}
      </h1>

      <p className="mb-6 font-serif text-2xl italic text-[#C8A96A]">
        {product.category}
      </p>

      <div className="mb-6 h-px w-16 bg-[#E8E2D9]" />

      <p className="mb-8 max-w-md leading-7 text-[#666]">
        {product.description}
      </p>

      {/* Feature accordion */}
      <div className="mb-8 divide-y divide-[#E8E2D9] rounded-2xl border border-[#E8E2D9]">
        {whyShop.map((item) => {
          let isOpen = openId === item.id;

          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-[#111111]">{item.title}</span>

                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#C8A96A]"
                >
                  <Plus size={16} />
                </motion.span>
              </button>

              {isOpen && (
                <p className="px-6 pb-4 text-sm text-[#777]">{item.description}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-4 rounded-full bg-[#F8F5F0] px-5 py-3">
          <button onClick={decrease} className="text-lg text-[#111111]">
            −
          </button>

          <span className="w-4 text-center font-medium">{quantity}</span>

          <button onClick={increase} className="text-lg text-[#111111]">
            +
          </button>
        </div>

        <button
          onClick={addToCart}
          disabled={adding}
          className="flex items-center gap-2 rounded-full bg-[#111111] px-8 py-3.5 font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
        >
          <ShoppingBag size={16} />
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductInfo;