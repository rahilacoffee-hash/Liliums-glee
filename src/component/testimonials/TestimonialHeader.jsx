import { motion } from "framer-motion";

import testimonialData from "./testimonialData";
import { fadeUp } from "./testimonialVariants";

function TestimonialHeader() {
  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto mb-20 max-w-3xl text-center"
    >
      {/* Eyebrow */}
      <div className="mb-6 flex items-center justify-center gap-5">
        <span className="h-px w-14 bg-[#C8A96A]" />

        <p className="text-xs font-medium uppercase tracking-[4px] text-[#C8A96A]">
          {testimonialData.eyebrow}
        </p>

        <span className="h-px w-14 bg-[#C8A96A]" />
      </div>

      {/* Heading */}
      <h2 className="font-serif text-4xl leading-tight text-[#111111] md:text-5xl lg:text-6xl">
        {testimonialData.title}
      </h2>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#666666]">
        {testimonialData.description}
      </p>

      {/* Rating */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1 text-[#C8A96A]">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M11.48 3.5a.75.75 0 011.04 0l2.57 5.2 5.74.84a.75.75 0 01.42 1.28l-4.15 4.04.98 5.71a.75.75 0 01-1.09.79L12 18.67l-5.14 2.69a.75.75 0 01-1.09-.79l.98-5.71-4.15-4.04a.75.75 0 01.42-1.28l5.74-.84 2.72-5.2z" />
            </svg>
          ))}
        </div>

        <span className="text-base font-medium text-[#444444]">
          Crafted with passion. Trusted by our clients.
        </span>
      </div>
    </motion.div>
  );
}

export default TestimonialHeader;