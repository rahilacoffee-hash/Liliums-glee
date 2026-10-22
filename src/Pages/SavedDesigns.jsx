import { Bookmark, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedItems } from "../context/SavedItemsContext";
import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";

function SavedDesigns() {
  const { savedDesigns, toggleSavedDesign } = useSavedItems();
  return <><Navbar /><main className="min-h-screen bg-[#FCFAF7] px-6 pb-20 pt-36"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">Your inspiration</p><h1 className="mt-3 font-serif text-4xl text-[#1C1512] sm:text-5xl">Saved Designs</h1>{savedDesigns.length === 0 ? <div className="mt-10 rounded-3xl border border-[#E8E2D9] bg-white px-6 py-16 text-center"><Bookmark className="mx-auto text-[#C8A96A]" size={30} /><h2 className="mt-5 font-serif text-2xl">No saved designs yet</h2><Link to="/gallery" className="mt-6 inline-flex rounded-full bg-[#1C1512] px-6 py-3 text-sm font-medium text-white">Explore the gallery</Link></div> : <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{savedDesigns.map((project) => <article key={project._id} className="overflow-hidden rounded-3xl border border-[#E8E2D9] bg-white"><Link to={`/gallery/${project.slug}`} className="block aspect-[4/3] bg-[#F7F3EC]">{project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#887C73]">Project image coming soon</div>}</Link><div className="flex items-start justify-between gap-4 p-5"><div><p className="text-xs uppercase tracking-[2px] text-[#A88A63]">{project.category}</p><h2 className="mt-2 font-serif text-xl text-[#1C1512]">{project.title}</h2></div><button onClick={() => toggleSavedDesign(project)} aria-label={`Remove ${project.title} from saved designs`} className="rounded-full border border-[#E8E2D9] p-3 text-[#8B2A35]"><Trash2 size={16} /></button></div></article>)}</div>}</div></main><Footer /></>;
}

export default SavedDesigns;
