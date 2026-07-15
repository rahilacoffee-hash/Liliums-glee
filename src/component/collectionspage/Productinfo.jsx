import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingBag, Award, Users, Wrench, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

// Maps each whyShop entry (by position) to an icon, since the data file
// doesn't carry icon references itself.
const whyShopIcons = [Award, Users, Wrench, Truck];

function ProductInfo({ product, whyShop }) {
  const { addToCart } = useCart();
  function handleAddToCart() {
  addToCart(product, quantity);

  toast.success(
    `${quantity} × ${product.name} added to basket`
  );
}
  let [quantity, setQuantity] = useState(1);

  function decrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increase() {
    setQuantity((q) => q + 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <p className="mb-3 text-xs uppercase tracking-[3px] text-[#C8A96A]">
        {product.category}
      </p>

      <h1 className="mb-4 font-serif text-4xl leading-tight text-[#111111] md:text-5xl">
        {product.name}
      </h1>

   

      <p className="mb-8 max-w-md text-base leading-8 text-[#666]">
        {product.description}
      </p>

      <div className="mb-8 font-serif text-3xl text-[#111111]">{product.price}</div>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-[#E8E2D9]">
          <button
            onClick={decrease}
            aria-label="Decrease quantity"
            className="flex h-12 w-12 items-center justify-center text-[#111111] transition hover:text-[#C8A96A]"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium text-[#111111]">{quantity}</span>
          <button
            onClick={increase}
            aria-label="Increase quantity"
            className="flex h-12 w-12 items-center justify-center text-[#111111] transition hover:text-[#C8A96A]"
          >
            <Plus size={16} />
          </button>
        </div>

      <button
  onClick={handleAddToCart}
  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-8 py-3.5 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-none"
>
  <ShoppingBag size={18} />
  Add to Basket
</button>
      </div>

      {/* Trust badges pulled from the site-wide "why shop" data */}
      <div className="grid grid-cols-2 gap-4 border-t border-[#E8E2D9] pt-8">
        {whyShop.map((item, i) => {
          let Icon = whyShopIcons[i % whyShopIcons.length];
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F8F5F0] text-[#C8A96A]">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#111111]">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProductInfo;