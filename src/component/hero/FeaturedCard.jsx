import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Detail({ label, value }) {
  return <><dt>{label}</dt><dd>{value || "—"}</dd></>;
}

export default function FeaturedCard({ project }) {
  return (
    <article className="w-full max-w-[340px] rounded-xl border border-white/35 bg-[#211813]/70 p-4 shadow-2xl backdrop-blur-md sm:p-5">
      <p className="text-[9px] font-medium tracking-[.24em] text-white/70">{project.eyebrow}</p>
      <h2 className="mt-1 font-display text-[clamp(1.2rem,1.45vw,1.55rem)] leading-tight">{project.title}</h2>
      <dl className="mt-4 grid grid-cols-[68px_1fr] gap-y-1 text-[10px] leading-5 sm:grid-cols-[76px_1fr] sm:text-[11px]">
        <Detail label="LOCATION" value={project.location} />
        <Detail label="AREA" value={project.area} />
        <Detail label="YEAR" value={project.year} />
      </dl>
      <Link aria-label={`View ${project.title}`} to={project.button?.href || "/gallery"} className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 transition hover:bg-white hover:text-[#1b120d] sm:bottom-5 sm:right-5"><ArrowRight size={15} /></Link>
    </article>
  );
}
