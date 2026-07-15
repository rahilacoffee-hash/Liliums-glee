import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import ReviewTable from "./Reviewtable";

let ratingOptions = ["All", "5", "4", "3", "2", "1"];

function Reviews() {
  let [reviews, setReviews] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let [search, setSearch] = useState("");
  let [debouncedSearch, setDebouncedSearch] = useState("");
  let [ratingFilter, setRatingFilter] = useState("All");
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError("");

      try {
        let params = { page, limit: 20 };
        if (debouncedSearch) params.search = debouncedSearch;
        if (ratingFilter !== "All") params.rating = ratingFilter;

        let { data } = await axiosInstance.get("/products/reviews/all", { params });
        setReviews(data.data.reviews);
        setTotalPages(data.data.totalPages);
        setTotal(data.data.total);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [debouncedSearch, ratingFilter, page]);

  function handleReviewDeleted(reviewId) {
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    setTotal((prev) => prev - 1);
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">Reviews</h1>
          <p className="mt-1 text-sm text-[#777]">{total} review{total === 1 ? "" : "s"} across all products</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search comments..."
              className="h-10 w-56 rounded-full border border-[#E8E2D9] bg-white pl-9 pr-4 text-sm text-[#111111] outline-none focus:border-[#C8A96A]"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-full border border-[#E8E2D9] bg-white px-4 py-2 text-sm text-[#111111] outline-none focus:border-[#C8A96A]"
          >
            {ratingOptions.map((r) => (
              <option key={r} value={r}>{r === "All" ? "All Ratings" : `${r} Star${r === "1" ? "" : "s"}`}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
          Loading reviews...
        </div>
      ) : (
        <>
          <ReviewTable reviews={reviews} onReviewDeleted={handleReviewDeleted} />

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-full text-sm transition ${
                    page === i + 1 ? "bg-[#C8A96A] text-black" : "border border-[#E8E2D9] text-[#666] hover:border-[#C8A96A]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Reviews;