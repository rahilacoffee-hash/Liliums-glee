import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

function ProductActions({ product }) {
  const { addToCart } = useCart();

  function handleAddToCart(e) {
    e.stopPropagation();

    addToCart(product, 1);

    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="flex flex-col gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
      <motion.button
        whileHover={{
          scale: 1.08,
          rotate: 3,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        title="Add to Cart"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white/95
          text-[#111111]
          shadow-lg
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-[#C8A96A]
          hover:text-white
        "
      >
        <ShoppingBag size={18} />
      </motion.button>
    </div>
  );
}

export default ProductActions;