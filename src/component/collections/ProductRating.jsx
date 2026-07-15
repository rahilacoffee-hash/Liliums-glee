import { Star } from "lucide-react";

function ProductRating({ rating = 5, reviews }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-[#F4C542] text-[#F4C542]"
                : "text-[#D6D6D6]"
            }
          />
        ))}
      </div>

      {reviews && (
        <span className="text-sm text-[#888888]">
          ({reviews})
        </span>
      )}
    </div>
  );
}

export default ProductRating;