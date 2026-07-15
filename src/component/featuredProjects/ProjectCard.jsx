import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { fadeUp } from "./projectVariants";

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      className="absolute left-8 right-8 bottom-8 z-20 rounded-[30px] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,.30)] lg:left-12 lg:right-auto lg:bottom-10 lg:max-w-md"
    >
      {/* Category */}
      <p className="mb-3 text-xs font-medium uppercase tracking-[3px] text-[#C8A96A]">
        {project.category}
      </p>

      {/* Title */}
      <h3 className="font-serif text-3xl leading-tight text-white">
        {project.title}
      </h3>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-white/10" />

      {/* Details */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#C8A96A]" />
          <span>{project.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#C8A96A]" />
          <span>{project.year}</span>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ x: 8 }}
        whileTap={{ scale: 0.98 }}
        className="group mt-8 flex items-center gap-3 text-sm font-medium tracking-wide text-white transition"
      >
        Explore Project

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#C8A96A] group-hover:bg-[#C8A96A] group-hover:text-[#111111]">
          <ArrowRight size={16} />
        </span>
      </motion.button>
    </motion.div>
  );
}

export default ProjectCard;