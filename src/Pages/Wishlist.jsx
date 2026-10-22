import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSavedItems } from "../context/SavedItemsContext";
import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";

function Wishlist() {
  const { wishlist, toggleWishlist } = useSavedItems();
  const { addToCart } = useCart();

  return <><Navbar /><main className="min-h-screen bg-[#FCFAF7] px-6 pb-20 pt-36"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">Your collection</p><h1 className="mt-3 font-serif text-4xl text-[#1C1512] sm:text-5xl">Wishlist</h1>{wishlist.length === 0 ? <div className="mt-10 rounded-3xl border border-[#E8E2D9] bg-white px-6 py-16 text-center"><Heart className="mx-auto text-[#C8A96A]" size={30} /><h2 className="mt-5 font-serif text-2xl">Your wishlist is empty</h2><Link to="/shop" className="mt-6 inline-flex rounded-full bg-[#1C1512] px-6 py-3 text-sm font-medium text-white">Explore the shop</Link></div> : <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((product) => <article key={product._id} className="overflow-hidden rounded-3xl border border-[#E8E2D9] bg-white"><Link to={`/shop/${product.slug}`} className="block aspect-square bg-[#F7F3EC]">{product.images?.[0]?.url ? <img src={product.images[0].url} alt={product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#887C73]">Product image coming soon</div>}</Link><div className="p-5"><h2 className="font-serif text-xl text-[#1C1512]">{product.name}</h2><p className="mt-2 font-medium">₦{Number(product.price || 0).toLocaleString("en-NG")}</p><div className="mt-5 flex gap-3"><button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1C1512] px-4 py-3 text-sm text-white"><ShoppingBag size={16} />Add to cart</button><button onClick={() => toggleWishlist(product)} aria-label={`Remove ${product.name} from wishlist`} className="rounded-full border border-[#E8E2D9] p-3 text-[#8B2A35]"><Trash2 size={16} /></button></div></div></article>)}</div>}</div></main><Footer /></>;
}

export default Wishlist;
