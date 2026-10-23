import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Award, Users, Wrench, Truck, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useSavedItems } from "../../context/SavedItemsContext";
import toast from "react-hot-toast";

// Maps each whyShop entry (by position) to an icon, since the data file
// doesn't carry icon references itself.
const whyShopIcons = [Award, Users, Wrench, Truck];

function ProductInfo({ product, whyShop, selectedColor, onColorChange }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useSavedItems();
  const isOutOfStock = Number(product.stock) <= 0;
  const isWishlisted = wishlist.some((item) => item._id === product._id);
  function handleAddToCart() {
  if (isOutOfStock) return;
  addToCart({ ...product, selectedColor: selectedColor?.name, selectedSize }, quantity);

  toast.success(
    `${quantity} × ${product.name} added to basket`
  );
}
  let [quantity, setQuantity] = useState(1);
  let [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  function decrease() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increase() {
    setQuantity((q) => Math.min(Number(product.stock) || 1, q + 1));
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

      <div className="mb-3 font-serif text-3xl text-[#111111]">₦{Number(product.price || 0).toLocaleString("en-NG")}</div>
      <p className={`mb-8 text-sm font-medium ${isOutOfStock ? "text-red-600" : "text-green-700"}`}>
        {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
      </p>

      {product.colors?.length > 0 && <div className="mb-6"><p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#665A51]">Colour: <span className="text-[#1C1512]">{selectedColor?.name}</span></p><div className="flex flex-wrap gap-3">{product.colors.map((color) => <button key={color._id || color.name} type="button" onClick={() => onColorChange(color)} title={color.name} className={`h-9 w-9 rounded-full border-2 p-0.5 ${selectedColor?.name === color.name ? "border-[#1C1512]" : "border-transparent"}`}><span className="block h-full w-full rounded-full" style={{ backgroundColor: color.hex || "#C8A96A" }} /></button>)}</div></div>}
      {product.sizes?.length > 0 && <div className="mb-7"><p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#665A51]">Size</p><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`min-w-11 rounded-lg border px-3 py-2 text-sm ${selectedSize === size ? "border-[#1C1512] bg-[#1C1512] text-white" : "border-[#E8E2D9]"}`}>{size}</button>)}</div></div>}

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-[#E8E2D9]">
          <button
            onClick={decrease}
            disabled={isOutOfStock}
            aria-label="Decrease quantity"
            className="flex h-12 w-12 items-center justify-center text-[#111111] transition hover:text-[#C8A96A]"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium text-[#111111]">{quantity}</span>
          <button
            onClick={increase}
            disabled={isOutOfStock || quantity >= product.stock}
            aria-label="Increase quantity"
            className="flex h-12 w-12 items-center justify-center text-[#111111] transition hover:text-[#C8A96A]"
          >
            <Plus size={16} />
          </button>
        </div>

      <button
  onClick={handleAddToCart}
  disabled={isOutOfStock}
  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C8A96A] px-8 py-3.5 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#D8D3CB] disabled:text-[#777] disabled:shadow-none sm:flex-none"
>
  <ShoppingBag size={18} />
  {isOutOfStock ? "Out of Stock" : "Add to Basket"}
</button>
      <button onClick={() => toggleWishlist(product)} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E2D9] text-[#1C1512] transition hover:border-[#C8A96A]">
        <Heart size={18} className={isWishlisted ? "fill-[#8B2A35] text-[#8B2A35]" : ""} />
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
