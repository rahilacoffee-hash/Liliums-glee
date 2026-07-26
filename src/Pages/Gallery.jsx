import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, LoaderCircle, MapPin, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import AIChat from "../component/AIChat";
import Footer from "../component/layout/Footer/Footer";
import Navbar from "../component/layout/Navbar/Navbar";

function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      try {
        const { data } = await axiosInstance.get("/project");
        if (active && data.success) setProjects(data.data);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || "We could not load the project gallery.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProjects();
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))], [projects]);
  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FCFAF7]">
        <section className="relative overflow-hidden bg-[#0F1713] pb-24 pt-40 text-white">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600" alt="Refined interior" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1713] via-[#0F1713]/80 to-transparent" />
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#C8A96A]/10 blur-[180px]" />

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="container-custom relative z-10 max-w-7xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-3 rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A96A]"><span className="h-2 w-2 rounded-full bg-[#C8A96A]" />Our Portfolio</span>
              <h1 className="mt-8 font-serif text-5xl font-light leading-tight text-white md:text-7xl">Spaces made to inspire everyday living.</h1>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-white/75">Explore a selection of interiors shaped around their people, purpose, and sense of place.</p>
              <Link to="/contact" className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#C8A96A] px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-[#111111] transition hover:bg-[#d6b679]">Start Your Project <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
              <div className="mt-20 grid max-w-xl grid-cols-3 gap-8 border-t border-white/10 pt-10"><div><p className="font-serif text-3xl text-[#C8A96A]">Bespoke</p><p className="mt-2 text-sm text-white/60">Interiors</p></div><div><p className="font-serif text-3xl text-[#C8A96A]">Every</p><p className="mt-2 text-sm text-white/60">Detail Considered</p></div><div><p className="font-serif text-3xl text-[#C8A96A]">One</p><p className="mt-2 text-sm text-white/60">Vision, Realised</p></div></div>
            </div>
          </motion.div>
        </section>

        <section className="container-custom py-14 md:py-20">
          <div className="flex flex-col justify-between gap-5 border-b border-[#E6DED2] pb-7 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2 text-sm text-[#756960]"><SlidersHorizontal size={16} className="text-[#C9A768]" />Filter by project type</div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${activeCategory === category ? "bg-[#1C1512] text-white" : "border border-[#E6DED2] bg-white text-[#665A51] hover:border-[#C9A768]"}`}>{category}</button>)}</div>
          </div>

          {loading ? <div className="flex min-h-80 items-center justify-center gap-3 text-sm text-[#756960]"><LoaderCircle size={19} className="animate-spin text-[#C9A768]" />Curating the gallery…</div> : error ? <div className="py-24 text-center"><p className="font-serif text-2xl text-[#1C1512]">Gallery unavailable</p><p className="mt-3 text-sm text-[#756960]">{error}</p></div> : visibleProjects.length === 0 ? <div className="py-24 text-center"><p className="font-serif text-2xl text-[#1C1512]">No projects in this collection yet.</p><button onClick={() => setActiveCategory("All")} className="mt-4 text-sm font-medium text-[#8E642E]">View all projects</button></div> : <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{visibleProjects.map((project, index) => <motion.article key={project._id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} className={`group overflow-hidden rounded-[26px] bg-white shadow-[0_8px_28px_rgba(41,25,13,.05)] ${index % 5 === 0 ? "sm:col-span-2 xl:col-span-2" : ""}`}><Link to={`/gallery/${project.slug}`} className="block"><div className={`relative overflow-hidden bg-[#EAE2D8] ${index % 5 === 0 ? "aspect-[16/8]" : "aspect-[4/4.3]"}`}>{project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center font-serif text-[#9A8A7C]">Project image coming soon</div>}<div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" /><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[1.5px] text-[#4A141F] backdrop-blur">{project.category}</span><span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1C1512] transition group-hover:bg-[#C9A768]"><ArrowUpRight size={18} /></span></div><div className="flex items-end justify-between gap-4 p-5 sm:p-6"><div><p className="mb-2 text-[10px] uppercase tracking-[2px] text-[#A88A63]">{project.year || "Liliums Glee project"}</p><h2 className="font-serif text-2xl leading-tight text-[#1C1512]">{project.title}</h2></div>{project.location && <span className="mb-1 hidden items-center gap-1 text-xs text-[#887C73] sm:flex"><MapPin size={13} />{project.location}</span>}</div></Link></motion.article>)}</div>}
        </section>
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default Gallery;
