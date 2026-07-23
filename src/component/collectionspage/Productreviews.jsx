// ProductReviews.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

function ProductReviews({ product }) {
  let [reviews, setReviews] = useState([]);
  let [rating, setRating] = useState(5);
  let [comment, setComment] = useState("");
  let [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [product._id]);

  async function fetchReviews() {
    try {
      let { data } = await axiosInstance.get(`/products/${product._id}/reviews`);

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
      setSubmitting(true);

      let { data } = await axiosInstance.post("/products/reviews", {
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
    } finally {
      setSubmitting(false);
    }
  }

  let totalReviews = reviews.length;

  let averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1)
      : 0;

  let breakdown = [5, 4, 3, 2, 1].map((star) => {
    let count = reviews.filter((r) => r.rating === star).length;

    return {
      star,
      count,
      percent: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  return (
    <section className="border-t border-[#E8E2D9] py-20">
      <div className="container-custom mx-auto px-6">
        <h2 className="mb-12 font-serif text-4xl text-[#111111]">Customer Reviews</h2>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Summary */}
          <div className="rounded-[24px] border border-[#E8E2D9] bg-[#F8F5F0] p-8">
            <div className="mb-3 font-serif text-5xl text-[#111111]">{averageRating}</div>

            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(averageRating)
                      ? "fill-[#C8A96A] text-[#C8A96A]"
                      : "text-[#E8E2D9]"
                  }
                />
              ))}
            </div>

            <p className="mb-8 text-sm text-[#777]">{totalReviews} Reviews</p>

            <div className="space-y-3">
              {breakdown.map((item) => (
                <div key={item.star} className="flex items-center gap-3 text-sm text-[#666]">
                  <span className="w-3">{item.star}</span>

                  <div className="h-2 flex-1 rounded-full bg-[#E8E2D9]">
                    <div
                      className="h-2 rounded-full bg-[#C8A96A]"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>

                  <span className="w-4 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2">
            <form
              onSubmit={submitReview}
              className="mb-10 rounded-[24px] border border-[#E8E2D9] p-6"
            >
              <h3 className="mb-4 font-serif text-xl text-[#111111]">Write a Review</h3>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mb-4 w-full rounded-full border border-[#E8E2D9] px-5 py-3 text-sm"
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
                className="mb-4 w-full rounded-2xl border border-[#E8E2D9] p-4 text-sm"
              />

              <button
                disabled={submitting}
                className="rounded-full bg-[#111111] px-8 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>

            <div className="space-y-6">
              {reviews.length === 0 && <p className="text-sm text-[#777]">No reviews yet.</p>}

              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[24px] border border-[#E8E2D9] p-6"
                >
                  <div className="mb-3 flex justify-between">
                    <div>
                      <h4 className="font-medium text-[#111111]">
                        {review.user?.name || "Anonymous"}
                      </h4>

                      <p className="text-sm text-[#999]">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={
                            i < review.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-[#E8E2D9]"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-[#666]">{review.comment}</p>
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