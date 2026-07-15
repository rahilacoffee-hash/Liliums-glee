// Placeholder review content - swap this for real customer reviews once
// you have a reviews table/endpoint. Keyed by product slug so each
// product can eventually have its own set; falls back to genericReviews
// for any slug not listed here.

export const genericReviews = [
  {
    id: 1,
    name: "Amaka O.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Exceeded my expectations. The finish looks even better in person than in the photos, and installation was quick.",
  },
  {
    id: 2,
    name: "Tunde A.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great quality for the price. Delivery took a couple of days longer than expected, but the product itself is excellent.",
  },
  {
    id: 3,
    name: "Chiamaka N.",
    rating: 5,
    date: "2 months ago",
    comment:
      "Our interior designer recommended this and I can see why. Premium feel, and it transformed the whole room.",
  },
];

export const reviewsBySlug = {
  // "premium-wall-treatment-panel": [ ...custom reviews for this product ]
};

export function getReviewsForProduct(slug) {
  return reviewsBySlug[slug] || genericReviews;
}