import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, LoaderCircle } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import AIChat from "../AIChat";
import Footer from "../layout/Footer/Footer";
import Navbar from "../layout/Navbar/Navbar";
import collectionsData, { featuredProducts } from "./collectionsData";
import ProductShowcase from "./ProductShowcase";
import ProductReviews from "./Productreviews";
import RelatedProducts from "./Relatedproducts";
import ProductFAQ from "./Productfaq";
import ProductCTA from "./Productcta";

function formatPrice(price) {
  if (typeof price === "number") return `₦${price.toLocaleString()}`;
  return price || "Price on request";
}

function normaliseProduct(product) {
  if (!product) return null;

  const images = Array.isArray(product.images) && product.images.length
    ? product.images.map((image) => (typeof image === "string" ? { url: image } : image))
    : product.image
      ? [{ url: product.image }]
      : [];

  return {
    ...product,
    _id: product._id || product.slug,
    isLocal: !product._id,
    images,
    image: images[0]?.url,
    priceLabel: formatPrice(product.price),
    numReviews: product.numReviews ?? product.reviews ?? 0,
  };
}

function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setNotFound(false);

      try {
        const { data } = await axiosInstance.get(`/products/${slug}`);
        if (!data.success) throw new Error("Product not found");

        const currentProduct = normaliseProduct(data.data);
        if (!active) return;
        setProduct(currentProduct);

        const productsResponse = await axiosInstance.get("/products?limit=24");
        if (!active || !productsResponse.data.success) return;

        const products = productsResponse.data.data.products
          .map(normaliseProduct)
          .filter((item) => item.category === currentProduct.category && item.slug !== currentProduct.slug)
          .slice(0, 3);
        setRelatedProducts(products);
      } catch {
        const localProduct = featuredProducts.find((item) => item.slug === slug);
        if (!active) return;

        if (!localProduct) {
          setNotFound(true);
          return;
        }

        const currentProduct = normaliseProduct(localProduct);
        setProduct(currentProduct);
        setRelatedProducts(
          featuredProducts
            .filter((item) => item.category === currentProduct.category && item.slug !== currentProduct.slug)
            .slice(0, 3)
            .map(normaliseProduct)
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();
    return () => { active = false; };
  }, [slug]);

  if (notFound) return <Navigate to="/shop" replace />;

  return (
    <>
      <Navbar />
      <main className="bg-[#F7F3EC] pb-16 lg:pb-0">
        {loading ? (
          <div className="flex min-h-screen items-center justify-center text-[#4A141F]">
            <LoaderCircle className="animate-spin" size={28} aria-label="Loading product" />
          </div>
        ) : product ? (
          <>
            <div className="mx-auto max-w-7xl px-6 pb-5 pt-28 lg:px-16 lg:pt-32">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-hidden text-xs uppercase tracking-[1.5px] text-[#85766c]">
                <Link to="/" className="transition hover:text-[#4A141F]">Home</Link>
                <ChevronRight size={13} />
                <Link to="/shop" className="transition hover:text-[#4A141F]">Collections</Link>
                <ChevronRight size={13} />
                <span className="truncate text-[#4A141F]">{product.name}</span>
              </nav>
            </div>

            <ProductShowcase product={product} whyShop={collectionsData.whyShop} />
            <ProductReviews product={product} />
            <RelatedProducts products={relatedProducts} />
            <ProductFAQ faq={collectionsData.faq} />
            <ProductCTA cta={collectionsData.cta} />
          </>
        ) : null}
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default ProductDetailsPage;
