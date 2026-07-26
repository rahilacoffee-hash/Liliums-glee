import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, LoaderCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import AIChat from "../component/AIChat";
import Footer from "../component/layout/Footer/Footer";
import Navbar from "../component/layout/Navbar/Navbar";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchProject() {
      try {
        const { data } = await axiosInstance.get(`/project/${id}`);
        if (!data.success) throw new Error("Project not found");
        if (!active) return;
        setProject(data.data);

        try {
          const relatedResponse = await axiosInstance.get("/project");
          if (active && relatedResponse.data.success) {
            setRelatedProjects(relatedResponse.data.data.filter((item) => item._id !== data.data._id && item.category === data.data.category).slice(0, 3));
          }
        } catch {
          // The project itself remains useful even when recommendations fail.
        }
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProject();
    return () => { active = false; };
  }, [id]);

  if (notFound) return <Navigate to="/gallery" replace />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FCFAF7] pt-28">
        {loading ? <div className="flex min-h-[70vh] items-center justify-center gap-3 text-sm text-[#756960]"><LoaderCircle size={19} className="animate-spin text-[#C9A768]" />Loading project…</div> : project && <><section className="container-custom pb-8 pt-6"><Link to="/gallery" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[1.5px] text-[#756960] transition hover:text-[#4A141F]"><ArrowLeft size={15} />Back to gallery</Link></section><section className="container-custom pb-20"><div className="overflow-hidden rounded-[30px] bg-[#35131B] text-white"><div className="grid lg:grid-cols-[1.2fr_.8fr]"><div className="relative min-h-[420px] bg-[#4A2A20] lg:min-h-[650px]">{project.image ? <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/50">Project image coming soon</div>}<div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div><motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} className="flex flex-col justify-center p-8 sm:p-12 lg:p-14"><p className="text-[11px] uppercase tracking-[3px] text-[#D4B276]">{project.category}</p><h1 className="mt-5 font-serif text-5xl leading-[1.04] md:text-6xl">{project.title}</h1><div className="my-8 h-px w-16 bg-[#D4B276]/45" /><p className="text-base leading-8 text-white/72">{project.description || "A considered Liliums Glee interior, designed around the rhythm of everyday life and finished with enduring detail."}</p><dl className="mt-10 grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-2">{project.location && <div><dt className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-[#D4B276]"><MapPin size={13} />Location</dt><dd className="mt-2 text-sm text-white/80">{project.location}</dd></div>}{project.year && <div><dt className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-[#D4B276]"><CalendarDays size={13} />Completed</dt><dd className="mt-2 text-sm text-white/80">{project.year}</dd></div>}</dl></motion.div></div></div></section>{relatedProjects.length > 0 && <section className="border-t border-[#E6DED2] py-20"><div className="container-custom"><div className="mb-9 flex items-end justify-between gap-5"><div><p className="text-[11px] uppercase tracking-[3px] text-[#C9A768]">Keep exploring</p><h2 className="mt-3 font-serif text-4xl text-[#1C1512]">More from this collection</h2></div><Link to="/gallery" className="hidden items-center gap-2 text-sm font-medium text-[#6B4A28] sm:inline-flex">All projects <ArrowRight size={16} /></Link></div><div className="grid gap-6 md:grid-cols-3">{relatedProjects.map((item) => <Link key={item._id} to={`/gallery/${item._id}`} className="group overflow-hidden rounded-3xl border border-[#E6DED2] bg-white"><div className="aspect-[4/3] overflow-hidden bg-[#EAE2D8]">{item.image && <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}</div><div className="p-5"><p className="text-[10px] uppercase tracking-[2px] text-[#A88A63]">{item.category}</p><h3 className="mt-2 font-serif text-xl text-[#1C1512]">{item.title}</h3></div></Link>)}</div></div></section>}</>}
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default ProjectDetails;
