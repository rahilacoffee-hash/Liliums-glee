// ProductCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCTA({ cta }) {
  return (
    <section className="bg-[#0D2B22] py-20 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container-custom mx-auto max-w-2xl px-6"
      >
        <p className="mb-4 text-xs uppercase tracking-[3px] text-[#C8A96A]">{cta.eyebrow}</p>

        <h2 className="mb-5 font-serif text-3xl leading-tight md:text-4xl">{cta.title}</h2>

        <p className="mb-10 text-white/60">{cta.description}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={cta.primaryButton.href}
            className="rounded-full bg-[#C8A96A] px-8 py-3.5 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {cta.primaryButton.label}
          </Link>

          <Link
            to={cta.secondaryButton.href}
            className="rounded-full border border-white/30 px-8 py-3.5 font-medium text-white transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
          >
            {cta.secondaryButton.label}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default ProductCTA;