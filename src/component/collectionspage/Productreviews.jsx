import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, MessageSquareText, Send, Star } from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

function RatingStars({ rating, size = 15, interactive = false, onSelect }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const selected = index < rating;
        const star = <Star size={size} className={selected ? "fill-[#C9A768] text-[#C9A768]" : "text-[#DDD3C8]"} />;

        if (!interactive) return <span key={index}>{star}</span>;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index + 1)}
            aria-label={`Rate ${index + 1} star${index ? "s" : ""}`}
            className="rounded p-1 transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A768]"
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}

function ProductReviews({ product }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(!product.isLocal);
  const [submitting, setSubmitting] = useState(false);

  async function fetchReviews() {
    if (product.isLocal) {
      setReviews([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/products/${product._id}/reviews`);
      if (data.success) setReviews(data.data);
    } catch (error) {
      console.error("Unable to load reviews", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, [product._id, product.isLocal]);

  async function submitReview(event) {
    event.preventDefault();
    if (!comment.trim()) {
      toast.error("Please add a short review before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await axiosInstance.post("/products/reviews", {
        productId: product._id,
        rating,
        comment: comment.trim(),
      });

      if (data.success) {
        setComment("");
        setRating(5);
        toast.success("Thank you for sharing your experience.");
        fetchReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit your review.");
    } finally {
      setSubmitting(false);
    }
  }

  const ratingSummary = useMemo(() => {
    const total = reviews.length;
    const average = total
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
      : 0;

    return {
      total,
      average,
      breakdown: [5, 4, 3, 2, 1].map((stars) => {
        const count = reviews.filter((review) => review.rating === stars).length;
        return { stars, count, percentage: total ? (count / total) * 100 : 0 };
      }),
    };
  }, [reviews]);

  return (
    <section className="border-y border-[#E6DED2] bg-[#FCFAF7] py-20 md:py-28">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-[3px] text-[#C9A768]">From our clients</p>
          <h2 className="font-serif text-4xl text-[#1C1512] md:text-5xl">Customer reviews</h2>
          <p className="mt-4 leading-7 text-[#71675F]">Thoughtful feedback from people who have welcomed our pieces into their spaces.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[.9fr_1.1fr]">
          <aside className="rounded-[28px] bg-[#35131B] p-7 text-white sm:p-9">
            <p className="text-xs uppercase tracking-[2px] text-[#D4B276]">Overall rating</p>
            <div className="mt-6 flex items-end gap-4"><span className="font-serif text-6xl leading-none">{ratingSummary.average.toFixed(1)}</span><div className="pb-1"><RatingStars rating={Math.round(ratingSummary.average)} /><p className="mt-2 text-sm text-white/60">Based on {ratingSummary.total} {ratingSummary.total === 1 ? "review" : "reviews"}</p></div></div>
            <div className="mt-9 space-y-3">{ratingSummary.breakdown.map((item) => <div key={item.stars} className="grid grid-cols-[18px_1fr_28px] items-center gap-3 text-xs text-white/70"><span>{item.stars}</span><div className="h-1.5 overflow-hidden rounded-full bg-white/15"><motion.div initial={{ width: 0 }} whileInView={{ width: `${item.percentage}%` }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="h-full rounded-full bg-[#D4B276]" /></div><span className="text-right">{item.count}</span></div>)}</div>
          </aside>

          <form onSubmit={submitReview} className="rounded-[28px] border border-[#E6DED2] bg-white p-7 sm:p-9">
            <div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EC] text-[#4A141F]"><MessageSquareText size={18} /></div><div><h3 className="font-serif text-2xl text-[#1C1512]">Share your experience</h3><p className="mt-1 text-sm leading-6 text-[#8B8078]">Your review helps others choose with confidence.</p></div></div>
            <div className="mt-7"><p className="mb-2 text-xs font-medium uppercase tracking-[1.5px] text-[#665A51]">Your rating</p><RatingStars rating={rating} size={23} interactive onSelect={setRating} /></div>
            <label className="mt-6 block text-xs font-medium uppercase tracking-[1.5px] text-[#665A51]">Your review<textarea required rows={4} value={comment} onChange={(event) => setComment(event.target.value)} maxLength={1000} placeholder="Tell us what you loved about this piece…" className="mt-2 block w-full resize-none rounded-2xl border border-[#E6DED2] bg-[#FCFAF7] px-4 py-3 text-sm leading-6 text-[#1C1512] outline-none transition placeholder:text-[#AA9E94] focus:border-[#C9A768] focus:ring-2 focus:ring-[#C9A768]/15" /></label>
            <div className="mt-4 flex items-center justify-between gap-4"><span className="text-xs text-[#9A8D83]">{comment.length}/1000</span><button disabled={submitting || product.isLocal} className="inline-flex items-center gap-2 rounded-full bg-[#1C1512] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4A141F] disabled:cursor-not-allowed disabled:opacity-50">{submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}{submitting ? "Sending" : "Submit review"}</button></div>
          </form>
        </div>

        <div className="mt-12 border-t border-[#E6DED2] pt-10">
          {loading ? <div className="flex items-center gap-3 py-8 text-sm text-[#74685F]"><LoaderCircle size={18} className="animate-spin text-[#C9A768]" />Loading reviews…</div> : reviews.length === 0 ? <div className="rounded-3xl border border-dashed border-[#DCCFC2] bg-white px-6 py-12 text-center"><MessageSquareText className="mx-auto text-[#C9A768]" size={27} /><h3 className="mt-4 font-serif text-2xl text-[#1C1512]">Be the first to review</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8B8078]">Your honest feedback can help someone else find the perfect fit for their space.</p></div> : <div className="grid gap-5 md:grid-cols-2">{reviews.map((review, index) => <motion.article key={review._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.06 }} className="rounded-3xl border border-[#E6DED2] bg-white p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4ECDD] font-serif text-[#4A141F]">{(review.user?.name || "A").charAt(0).toUpperCase()}</div><div className="min-w-0"><h3 className="truncate font-medium text-[#1C1512]">{review.user?.name || "Anonymous"}</h3><p className="mt-0.5 text-xs text-[#968980]">{new Date(review.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p></div></div><RatingStars rating={review.rating} size={13} /></div><p className="mt-5 text-sm leading-7 text-[#665A51]">{review.comment}</p></motion.article>)}</div>}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
