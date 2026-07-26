import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  Lightbulb,
  LoaderCircle,
  MapPin,
  Palette,
  Ruler,
} from "lucide-react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import AIChat from "../component/AIChat";
import Footer from "../component/layout/Footer/Footer";
import Navbar from "../component/layout/Navbar/Navbar";

function getProjectStory(project) {
  const category = project.category || "interior design";

  return {
    brief: project.description || `A tailored ${category.toLowerCase()} project shaped around the way its occupants live, work, and gather.`,
    approach: `We balanced enduring materials, thoughtful spatial planning, and a refined visual language to make every part of this ${category.toLowerCase()} feel intentional.`,
    highlights: [
      "A layout tailored to daily rituals and movement",
      "Layered textures and finishes with lasting appeal",
      "Considered lighting and styling for a complete atmosphere",
    ],
  };
}

function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchProject() {
      setLoading(true);
      setNotFound(false);

      try {
        const { data } = await axiosInstance.get(`/project/${encodeURIComponent(slug)}`);
        if (!data.success) throw new Error("Project not found");
        if (!active) return;

        setProject(data.data);

        try {
          const relatedResponse = await axiosInstance.get("/project");
          if (active && relatedResponse.data.success) {
            setRelatedProjects(
              relatedResponse.data.data
                .filter((item) => item._id !== data.data._id && item.category === data.data.category)
                .slice(0, 3)
            );
          }
        } catch {
          // Recommendations are helpful but should never prevent the case study loading.
        }
      } catch {
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProject();
    return () => { active = false; };
  }, [slug]);

  if (notFound) return <Navigate to="/gallery" replace />;

  const story = project ? getProjectStory(project) : null;
  const metadata = project ? [
    { label: "Project type", value: project.category, icon: Palette },
    { label: "Location", value: project.location || "Nigeria", icon: MapPin },
    { label: "Completed", value: project.year || "In progress", icon: CalendarDays },
  ] : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FCFAF7] pt-28">
        {loading ? (
          <div className="flex min-h-[70vh] items-center justify-center gap-3 text-sm text-[#756960]">
            <LoaderCircle size={19} className="animate-spin text-[#C9A768]" />
            Loading project…
          </div>
        ) : project && (
          <>
            <div className="container-custom pb-7 pt-5">
              <Link to="/gallery" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[1.5px] text-[#756960] transition hover:text-[#4A141F]">
                <ArrowLeft size={15} /> Back to gallery
              </Link>
            </div>

            <section className="container-custom pb-20">
              <div className="grid overflow-hidden rounded-[30px] bg-[#0F1713] text-white lg:grid-cols-[1.12fr_.88fr]">
                <div className="relative min-h-[440px] bg-[#29342D] lg:min-h-[680px]">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-serif text-white/50">Project image coming soon</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1713]/55 via-transparent to-transparent" />
                  <p className="absolute bottom-7 left-7 text-[10px] uppercase tracking-[3px] text-[#E2C682] sm:bottom-9 sm:left-9">Liliums Glee case study</p>
                </div>

                <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                  <p className="text-[11px] uppercase tracking-[3px] text-[#C8A96A]">{project.category}</p>
                  <h1 className="mt-5 font-serif text-5xl leading-[1.04] md:text-6xl">{project.title}</h1>
                  <p className="mt-7 text-base leading-8 text-white/75">{story.brief}</p>
                  <div className="mt-10 grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {metadata.map(({ label, value, icon: Icon }) => (
                      <div key={label}>
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[1.7px] text-[#C8A96A]"><Icon size={13} />{label}</p>
                        <p className="mt-2 text-sm text-white/80">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="border-y border-[#E6DED2] bg-white py-20 md:py-28">
              <div className="container-custom grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                <div>
                  <p className="text-[11px] uppercase tracking-[3px] text-[#C9A768]">Project story</p>
                  <h2 className="mt-4 font-serif text-4xl leading-tight text-[#1C1512] md:text-5xl">A space with a point of view.</h2>
                </div>
                <div className="max-w-2xl">
                  <p className="font-serif text-2xl leading-10 text-[#332722] sm:text-3xl">{story.brief}</p>
                  <p className="mt-7 text-base leading-8 text-[#71675F]">{story.approach}</p>
                </div>
              </div>
            </section>

            <section className="container-custom py-20 md:py-28">
              <div className="grid gap-10 lg:grid-cols-[1fr_.94fr] lg:gap-20">
                <div className="rounded-[28px] bg-[#F3EEE7] p-7 sm:p-10">
                  <p className="text-[11px] uppercase tracking-[3px] text-[#A8824B]">Design details</p>
                  <h2 className="mt-4 font-serif text-4xl text-[#1C1512]">What shaped the outcome</h2>
                  <ul className="mt-9 space-y-5">
                    {story.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-4 text-sm leading-7 text-[#665A51]">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C8A96A] text-[#1C1512]"><Check size={14} /></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-3xl border border-[#E6DED2] bg-white p-6"><Compass size={20} className="text-[#A8824B]" /><h3 className="mt-7 font-serif text-xl text-[#1C1512]">Understand</h3><p className="mt-2 text-sm leading-6 text-[#74685F]">We begin with the people, rhythms, and practical needs that make a space personal.</p></div>
                  <div className="rounded-3xl border border-[#E6DED2] bg-white p-6"><Lightbulb size={20} className="text-[#A8824B]" /><h3 className="mt-7 font-serif text-xl text-[#1C1512]">Refine</h3><p className="mt-2 text-sm leading-6 text-[#74685F]">Every material, proportion, and finish is brought into one clear visual language.</p></div>
                  <div className="rounded-3xl border border-[#E6DED2] bg-white p-6"><Ruler size={20} className="text-[#A8824B]" /><h3 className="mt-7 font-serif text-xl text-[#1C1512]">Deliver</h3><p className="mt-2 text-sm leading-6 text-[#74685F]">We bring the concept to life with detail, care, and a well-managed final installation.</p></div>
                </div>
              </div>
            </section>

            <section className="bg-[#0F1713] py-20 text-white md:py-24">
              <div className="container-custom flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-2xl"><p className="text-[11px] uppercase tracking-[3px] text-[#C8A96A]">Your project, next</p><h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Have a space ready for its next chapter?</h2><p className="mt-5 max-w-xl leading-8 text-white/70">Tell us what you are planning and we’ll help shape it into an interior that feels unmistakably yours.</p></div>
                <Link to="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#C8A96A] px-7 py-4 text-sm font-semibold uppercase tracking-[1.5px] text-[#111111] transition hover:bg-[#d6b679]">Book consultation <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </section>

            {relatedProjects.length > 0 && (
              <section className="container-custom py-20 md:py-28">
                <div className="mb-10 flex items-end justify-between gap-5"><div><p className="text-[11px] uppercase tracking-[3px] text-[#C9A768]">Keep exploring</p><h2 className="mt-3 font-serif text-4xl text-[#1C1512]">More from this collection</h2></div><Link to="/gallery" className="hidden items-center gap-2 text-sm font-medium text-[#6B4A28] sm:inline-flex">All projects <ArrowRight size={16} /></Link></div>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedProjects.map((item) => (
                    <Link key={item._id} to={`/gallery/${item.slug}`} className="group overflow-hidden rounded-3xl border border-[#E6DED2] bg-white transition hover:shadow-xl">
                      <div className="aspect-[4/3] overflow-hidden bg-[#EAE2D8]">{item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-sm text-[#97897D]">Image coming soon</div>}</div>
                      <div className="p-5"><p className="text-[10px] uppercase tracking-[2px] text-[#A88A63]">{item.category}</p><h3 className="mt-2 font-serif text-xl text-[#1C1512]">{item.title}</h3></div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
      <AIChat />
    </>
  );
}

export default ProjectDetails;
