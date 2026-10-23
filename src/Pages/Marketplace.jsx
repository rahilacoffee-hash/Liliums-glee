import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";
import AIChat from "../component/AIChat";
import FeaturedProducts from "../component/collectionspage/FeaturedProducts";

function Marketplace() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <FeaturedProducts featuredOnly={false} />
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default Marketplace;
