import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import collectionsData, { featuredProducts as shopProducts } from "./collectionsData";
import { featuredProducts as homepageProducts } from "../featured-products/productsData";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import { getReviewsForProduct } from "./reviewsData";
import RelatedProducts from "./RelatedProducts";
import ProductFAQ from "./ProductFAQ";
import ProductCTA from "./ProductCTA";

let allProducts = [...shopProducts, ...homepageProducts];

function ProductDetailsPage() {
  let { slug } = useParams();
  let product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  let relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

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

          <ProductInfo product={product} whyShop={collectionsData.whyShop} />
        </div>
      </section>

      <ProductReviews product={product} reviews={getReviewsForProduct(product.slug)} />
      <RelatedProducts products={relatedProducts} />
      <ProductFAQ faq={collectionsData.faq} />
      <ProductCTA cta={collectionsData.cta} />
    </main>
  );
}

export default ProductDetailsPage;