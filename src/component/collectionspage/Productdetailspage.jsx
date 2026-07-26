import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

import ProductGallery from "./Productgallery";
import ProductInfo from "./Productinfo";
import ProductReviews from "./Productreviews";
import RelatedProducts from "./Relatedproducts";
import ProductFAQ from "./Productfaq";
import ProductCTA from "./Productcta";

// Not covered by any backend content model yet - static for now.
// Move these into Settings/SiteContent later if you want them admin-editable.
let whyShop = [
  { id: 1, title: "Premium Materials", description: "Every piece sourced for quality and craftsmanship." },
  { id: 2, title: "Fast Delivery", description: "Nationwide delivery, tracked from dispatch to doorstep." },
  { id: 3, title: "Expert Support", description: "Our team is on hand for sizing, styling, and care advice." },
  { id: 4, title: "Easy Returns", description: "Not the right fit? Return within 14 days, no questions asked." },
];

let faq = [
  { id: 1, question: "What is your delivery timeframe?", answer: "Most orders arrive within 5-10 business days depending on your location." },
  { id: 2, question: "Do you offer installation?", answer: "Yes, installation can be arranged for select items - contact us after ordering." },
  { id: 3, question: "What is your return policy?", answer: "Returns are accepted within 14 days of delivery, provided the item is unused." },
];

let cta = {
  eyebrow: "Still Deciding?",
  title: "Talk to a Design Specialist",
  description: "Not sure this piece is right for your space? Book a free consultation and we'll help you choose.",
  primaryButton: { label: "Book Consultation", href: "/contact" },
  secondaryButton: { label: "Browse More", href: "/shop" },
};

function ProductDetailsPage() {
  let { slug } = useParams();

  let [product, setProduct] = useState(null);
  let [reviews, setReviews] = useState([]);
  let [relatedProducts, setRelatedProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setNotFound(false);

      try {
        let { data } = await axiosInstance.get(`/products/${slug}`);
        let fetchedProduct = data.data;
        setProduct(fetchedProduct);

        // Fetch reviews and related products in parallel once we have the product
        let [reviewsRes, relatedRes] = await Promise.all([
          axiosInstance.get(`/products/${fetchedProduct._id}/reviews`),
          axiosInstance.get("/products", { params: { category: fetchedProduct.category, limit: 4 } }),
        ]);

        setReviews(reviewsRes.data.data);
        setRelatedProducts(
          relatedRes.data.data.products.filter((p) => p.slug !== slug).slice(0, 3)
        );
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (notFound) {
    return <Navigate to="/shop" replace />;
  }

  if (loading || !product) {
    return <div className="pt-32 text-center text-sm text-[#777]">Loading product...</div>;
  }

  return (
    <main className="bg-white">

      {/* Breadcrumb */}
      <div className="container-custom mx-auto px-6 pb-2 pt-28">
        <nav className="flex items-center gap-2 text-sm text-[#777]">
          <Link to="/" className="hover:text-[#C8A96A]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-[#C8A96A]">Shop</Link>
          <ChevronRight size={14} />
          <span className="truncate text-[#111111]">{product.name}</span>
        </nav>
      </div>

      {/* Product overview - gallery stays pinned while the info column scrolls */}
      <section className="container-custom mx-auto px-6 pb-20 pt-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery product={product} />
          </div>

          <ProductInfo product={product} whyShop={whyShop} />
        </div>
      </section>

      <ProductReviews product={product} reviews={reviews} />
      <RelatedProducts products={relatedProducts} />
      <ProductFAQ faq={faq} />
      <ProductCTA cta={cta} />
    </main>
  );
}

export default ProductDetailsPage;