import { useState } from "react";
import { Star, Trash2, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function ReviewTable({ reviews, onReviewDeleted }) {
  let [deletingId, setDeletingId] = useState(null);
  let [confirmId, setConfirmId] = useState(null);

  async function handleDelete(reviewId) {
    setDeletingId(reviewId);
    try {
      await axiosInstance.delete(`/product/reviews/${reviewId}`);
      onReviewDeleted(reviewId);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete review");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
        No reviews found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#E8E2D9] text-xs uppercase tracking-[1px] text-[#999]">
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Customer</th>
            <th className="px-5 py-4">Rating</th>
            <th className="px-5 py-4">Comment</th>
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-b border-[#E8E2D9] align-top transition last:border-0 hover:bg-[#F8F5F0]">
              <td className="px-5 py-4">
                {review.product ? (
                  <Link
                    to={`/shop/${review.product.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-[#111111] hover:text-[#C8A96A]"
                  >
                    {review.product.name}
                    <LinkIcon size={12} />
                  </Link>
                ) : (
                  <span className="text-[#999]">Product deleted</span>
                )}
              </td>

              <td className="px-5 py-4">
                <p className="text-[#111111]">{review.user?.name || "Unknown user"}</p>
                <p className="text-xs text-[#999]">{review.user?.email}</p>
              </td>

              <td className="px-5 py-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < review.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-[#E8E2D9]"}
                    />
                  ))}
                </div>
              </td>

              <td className="max-w-xs px-5 py-4 text-[#666]">
                <p className="line-clamp-2">{review.comment}</p>
              </td>

              <td className="whitespace-nowrap px-5 py-4 text-[#666]">
                {new Date(review.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </td>

              <td className="px-5 py-4">
                {confirmId === review._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(review._id)}
                      disabled={deletingId === review._id}
                      className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                    >
                      {deletingId === review._id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="rounded-full border border-[#E8E2D9] px-3 py-1.5 text-xs font-medium text-[#666] transition hover:border-[#999]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(review._id)}
                    title="Delete review"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D9] text-[#666] transition hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewTable;