import { Star } from "lucide-react";

function ProductRating({
  rating = 0,
  numReviews = 0,
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < Math.round(rating)
                ? "fill-[#C8A96A] text-[#C8A96A]"
                : "fill-transparent text-[#D6D6D6]"
            }
          />
        ))}
      </div>

      {/* Reviews */}
      <span className="text-xs text-gray-500">
        ({numReviews} {numReviews === 1 ? "Review" : "Reviews"})
      </span>
    </div>
  );
}

export default ProductRating;