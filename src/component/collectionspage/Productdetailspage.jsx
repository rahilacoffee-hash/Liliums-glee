import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

import collectionsData from "./collectionsData";
import ProductGallery from "./Productgallery";
import ProductInfo from "./Productinfo";
import ProductReviews from "./Productreviews";
import RelatedProducts from "./Relatedproducts";
import ProductFAQ from "./Productfaq";
import ProductCTA from "./Productcta";
import Navbar from "../layout/Navbar/Navbar"

function ProductDetailsPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(`/products/${slug}`);

      if (!data.success) {
        setNotFound(true);
        return;
      }

      setProduct(data.data);

      // Fetch related products
      const res = await axiosInstance.get("/products");

      if (res.data.success) {
        const related = res.data.data.products
          .filter(
            (item) =>
              item.category === data.data.category &&
              item.slug !== data.data.slug
          )
          .slice(0, 3);

        setRelatedProducts(related);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (notFound || !product) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <>
    <Navbar/>
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="container-custom mx-auto px-6 pt-32 pb-6">
        <nav className="flex items-center gap-2 text-sm text-[#777]">
          <Link to="/" className="hover:text-[#C8A96A]">
            Home
          </Link>

          <ChevronRight size={14} />

          <Link to="/shop" className="hover:text-[#C8A96A]">
            Shop
          </Link>

          <ChevronRight size={14} />

          <span className="text-[#111111]">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="container-custom mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />

          <ProductInfo
            product={product}
            whyShop={collectionsData.whyShop}
          />
        </div>
      </section>

      <ProductReviews product={product} />

      <RelatedProducts products={relatedProducts} />

      <ProductFAQ faq={collectionsData.faq} />

      <ProductCTA cta={collectionsData.cta} />
    </main>
    </>
  );
}

export default ProductDetailsPage;