import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import contactData from "./contactData";
import {
  mapReveal,
  fadeRight,
  buttonHover,
} from "./contactVariants";

function StudioVisit() {
  const { studio } = contactData;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">
        <div className="overflow-hidden rounded-[40px] shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* ================= Google Map ================= */}

            <motion.div
              variants={mapReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-[450px] lg:h-[650px]"
            >
              <iframe
                title="Studio Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  studio.location
                )}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                className="h-full w-full border-0"
              />
            </motion.div>

            {/* ================= Studio Content ================= */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center bg-[#111111] px-10 py-16 md:px-16 lg:px-20"
            >
              <span className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]">
                Visit Our Studio
              </span>

              <h2 className="mt-6 font-serif text-4xl leading-tight text-white md:text-5xl">
                {studio.title}
              </h2>

              <div className="mt-8 h-px w-16 bg-[#C8A96A]" />

              <p className="mt-8 max-w-lg text-lg leading-8 text-white/70">
                {studio.description}
              </p>

              <div className="mt-8">
                <h4 className="mb-2 text-sm uppercase tracking-[3px] text-[#C8A96A]">
                  Address
                </h4>

                <p className="leading-8 text-white/80">
                  {studio.location}
                </p>
              </div>

              <motion.a
                href={studio.button.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                className="mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-[#C8A96A] px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-[#111111] transition-all duration-300 hover:bg-[#d8b676]"
              >
                {studio.button.label}

                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudioVisit;