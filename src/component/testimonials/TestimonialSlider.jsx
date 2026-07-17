import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

import TestimonialCard from "./TestimonialCard";

function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const count = testimonials.length;

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data } = await axiosInstance.get("/testimonial", {
          params: { featuredOnly: true },
        });
        setTestimonials(data.data);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % count);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + count) % count);
  };

  // Auto play - only once testimonials have actually loaded
  useEffect(() => {
    if (count === 0) return undefined;
    const timer = setInterval(goNext, 7000);
    return () => clearInterval(timer);
  }, [count]);

  if (loading) {
    return <section className="py-20 lg:py-28" />;
  }

  if (count === 0) {
    return null; // nothing to show, don't render an empty section
  }

  const prev = testimonials[(index - 1 + count) % count];
  const current = testimonials[index];
  const next = testimonials[(index + 1) % count];

  return (
    <section className="relative py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden">

        <button
          onClick={goPrev}
          className="absolute left-6 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8A96A]/30 bg-[#0F1613] text-white transition hover:bg-[#C8A96A] hover:text-black lg:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={goNext}
          className="absolute right-6 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8A96A]/30 bg-[#0F1613] text-white transition hover:bg-[#C8A96A] hover:text-black lg:flex"
        >
          <ChevronRight size={20} />
        </button>

        <div className="relative flex items-center justify-center">

          {count > 1 && (
            <motion.div
              animate={{ scale: 0.86, opacity: 0.28, x: -120 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 hidden w-[34%] lg:block"
            >
              <div className="pointer-events-none">
                <TestimonialCard testimonial={prev} />
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 w-full max-w-6xl px-5 lg:px-0"
            >
              <TestimonialCard testimonial={current} />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <motion.div
              animate={{ scale: 0.86, opacity: 0.28, x: 120 }}
              transition={{ duration: 0.5 }}
              className="absolute right-0 hidden w-[34%] lg:block"
            >
              <div className="pointer-events-none">
                <TestimonialCard testimonial={next} />
              </div>
            </motion.div>
          )}
        </div>

        {count > 1 && (
          <div className="mx-auto mt-14 flex max-w-md items-center gap-6">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#E7DED1]">
              <motion.div
                animate={{ width: `${((index + 1) / count) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-[#C8A96A]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestimonialSlider;