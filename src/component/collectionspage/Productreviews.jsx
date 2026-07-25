import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

function ProductReviews({ product }) {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [product._id]);

  async function fetchReviews() {
    try {
      const { data } = await axiosInstance.get(
        `/products/${product._id}/reviews`
      );

      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitReview(e) {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/products/reviews", {
        productId: product._id,
        rating,
        comment,
      });

      if (data.success) {
        setComment("");
        setRating(5);

        fetchReviews();
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to submit review");
    }
  }

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, item) => sum + item.rating, 0) /
          totalReviews
        ).toFixed(1)
      : 0;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;

    return {
      star,
      count,
      percent: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  return (
    <section className="border-t border-[#E8E2D9] py-20">
      <div className="container-custom mx-auto px-6">

        <h2 className="mb-12 font-serif text-4xl">
          Customer Reviews
        </h2>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Summary */}

          <div>

            <div className="text-5xl font-serif mb-3">
              {averageRating}
            </div>

            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="mb-8 text-gray-500">
              {totalReviews} Reviews
            </p>

            <div className="space-y-3">
              {breakdown.map((item) => (
                <div
                  key={item.star}
                  className="flex items-center gap-3"
                >
                  {item.star}

                  <div className="flex-1 h-2 rounded bg-gray-200">

                    <div
                      className="h-2 rounded bg-[#C8A96A]"
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />

                  </div>

                  {item.count}
                </div>
              ))}
            </div>

          </div>

          {/* Reviews */}

          <div className="lg:col-span-2">

            <form
              onSubmit={submitReview}
              className="mb-10 rounded-xl border p-6"
            >

              <h3 className="mb-4 text-xl font-semibold">
                Write a Review
              </h3>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mb-4 w-full rounded border p-3"
              >
                <option value={5}>★★★★★</option>
                <option value={4}>★★★★☆</option>
                <option value={3}>★★★☆☆</option>
                <option value={2}>★★☆☆☆</option>
                <option value={1}>★☆☆☆☆</option>
              </select>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="mb-4 w-full rounded border p-3"
              />

              <button
                className="rounded bg-[#C8A96A] px-8 py-3"
              >
                Submit Review
              </button>

            </form>

            <div className="space-y-6">

              {reviews.length === 0 && (
                <p>No reviews yet.</p>
              )}

              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border p-6"
                >

                  <div className="flex justify-between mb-3">

                    <div>

                      <h4 className="font-semibold">
                        {review.user?.name || "Anonymous"}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="flex">

                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}

                    </div>

                  </div>

                  <p>{review.comment}</p>

                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductReviews;