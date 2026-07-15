import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProductActions({ product }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      {/* Add to Cart */}

      <button
        className="
          group
          inline-flex
          flex-1
          items-center
          justify-center
          gap-2
          rounded-full
          bg-[#111111]
          px-5
          py-3
          text-sm
          font-medium
          text-white
          transition-all
          duration-300
          hover:bg-[#C8A96A]
          hover:text-[#111111]
        "
      >
        <ShoppingBag
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        Add to Cart
      </button>

      {/* View Details */}

      <Link
       to={`/${product.slug}`}
        className="
          group
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#E6E1D8]
          text-[#111111]
          transition-all
          duration-300
          hover:border-[#C8A96A]
          hover:bg-[#C8A96A]
        "
      >
        <ArrowUpRight
          size={18}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export default ProductActions;