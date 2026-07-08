import { motion } from "framer-motion";
import { Quote } from "lucide-react";

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-[32px] border border-white/10 bg-white p-10 md:p-14">

      <Quote size={56} strokeWidth={1.2} className="mb-4 text-[#C8A96A]/25" />

      <blockquote className="mb-8 font-serif text-xl leading-relaxed text-[#111111] md:text-2xl">
        {testimonial.quote}
      </blockquote>

      <div className="mb-8 flex gap-1.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-lg text-[#C8A96A]">★</span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-14 w-14 flex-shrink-0 rounded-full border-2 border-[#F8F5F0] object-cover"
          />
          <div>
            <h3 className="font-serif text-lg text-[#111111]">{testimonial.name}</h3>
            <p className="text-sm text-[#777777]">
              {testimonial.role || testimonial.location}
            </p>
          </div>
        </div>

        {testimonial.project && (
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E2D9] bg-[#F8F5F0] px-4 py-2 text-xs font-medium text-[#111111]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
            {testimonial.project}
          </span>
        )}
      </div>
    </div>
  );
}

export default TestimonialCard;