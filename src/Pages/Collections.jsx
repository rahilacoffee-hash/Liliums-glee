
import AIChat from "../component/AIChat";
import CollectionsCTA from "../component/collectionspage/CollectionsCTA";
import CollectionsFAQ from "../component/collectionspage/CollectionsFAQ";
import CollectionsHero from "../component/collectionspage/CollectionsHero";
import FeaturedCollection from "../component/collectionspage/FeaturedCollection";
import FeaturedProducts from "../component/collectionspage/FeaturedProducts";
import WhyShop from "../component/collectionspage/WhyShop";
import Footer from "../component/layout/Footer/Footer";
import Navbar from "../component/layout/Navbar/Navbar";


function Collections() {
  return (
    <>
      {/* ================= Navbar ================= */}

      <Navbar />

      {/* ================= Main ================= */}

      <main className="overflow-hidden">
        <CollectionsHero />

        <FeaturedProducts />

        {/* <FeaturedCollection /> */}

        {/* <WhyShop /> */}

        <CollectionsFAQ />

        <CollectionsCTA />
      </main>

      {/* ================= Footer ================= */}

      <Footer />
       <AIChat/>  
    </>
  );
}

export default Collections;