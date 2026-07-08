import { motion } from "framer-motion";

import processContent, { processSteps } from "./designProcessData";
import ProcessCard from "./ProcessCard";

export default function DesignProcess() {
  return (
    <section
      id="design-process"
      className="relative overflow-hidden bg-[#F7F4EF] py-28 lg:py-36"
    >
      {/* Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]
          bg-[linear-gradient(#0D2B22_1px,transparent_1px),linear-gradient(90deg,#0D2B22_1px,transparent_1px)]
          [background-size:52px_52px]"
      />

      {/* Decorative Glows */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#C8A96A]/10 blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#0D2B22]/8 blur-[150px]"
      />

      {/* Decorative Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -top-20 right-20 hidden h-72 w-72 rounded-full border border-dashed border-[#C8A96A]/20 lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-28 left-10 hidden h-96 w-96 rounded-full border border-dashed border-[#0D2B22]/10 lg:block"
      />

      {/* Dot Pattern */}
      <div className="pointer-events-none absolute right-12 top-16 grid grid-cols-6 gap-2 opacity-20">
        {Array.from({ length: 36 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
        ))}
      </div>

      <div className="container-custom relative mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <p className="mb-4 uppercase tracking-[4px] text-[#C8A96A]">
            {processContent.eyebrow}
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#111111] md:text-6xl">
            {processContent.title}
            <span className="block text-[#C8A96A]">{processContent.highlight}</span>
          </h2>

          <div className="mx-auto my-8 h-px w-20 bg-[#C8A96A]" />

          <p className="mx-auto max-w-2xl text-lg leading-9 text-[#666]">
            {processContent.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">

          {/* Animated Center Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-1/2 top-0 hidden w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#C8A96A] via-[#0D2B22]/40 to-[#C8A96A] lg:block"
          />

          {/* Timeline Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 bg-[#C8A96A]/10 blur-3xl lg:block" />

          {/* Timeline Items */}
          <div className="relative z-10">
            {processSteps.map((item, index) => (
              <ProcessCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Philosophy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-28 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-white/80 p-10 shadow-[0_25px_70px_rgba(15,23,42,.08)] backdrop-blur-xl md:p-14">

            <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-[#C8A96A]/10 blur-[100px]" />

            <div className="relative z-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C8A96A]">
                Our Design Philosophy
              </span>

              <h3 className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl">
                Every Detail Builds
                <span className="block text-[#C8A96A]">A Lasting Feeling</span>
              </h3>

              <div className="mx-auto mt-8 h-px w-16 bg-[#C8A96A]" />

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-[#666]">
                Our process reflects years of craft, close collaboration, and
                an unwavering attention to how a space actually feels to live
                in — not just how it photographs.
              </p>

              <button className="mx-auto mt-10 rounded-full bg-[#C8A96A] px-8 py-4 font-medium text-[#111] transition hover:-translate-y-1 hover:shadow-xl">
                Book a Consultation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#C8A96A]" />
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#C8A96A] bg-white">
              <div className="h-2.5 w-2.5 rounded-full bg-[#C8A96A]" />
            </div>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#C8A96A]" />
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="text-lg leading-8 text-[#888]">
            Our story is still being written. Every project, every client
            relationship, and every finished room adds another chapter to
            the work we're proud of.
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-white/60 to-white" />
    </section>
  );
}