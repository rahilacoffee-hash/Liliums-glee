import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

import contactData from "./contactData";
import { faqItem, fadeLeft, fadeRight, buttonHover } from "./contactVariants";

function ContactFAQAndCTA() {
  let { faq, cta } = contactData;
  let [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:gap-0">

      {/* FAQ */}
      <div className="px-6 lg:pr-12">
        <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
          <h2 className="font-serif text-3xl text-[#111111] md:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-4 h-px w-14 bg-[#C8A96A]" />
        </motion.div>

        <div className="space-y-3">
          {faq.map((item) => {
            let isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                variants={faqItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl border border-[#E8E2D9] bg-white"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-[#111111]">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 text-[#C8A96A]"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-6 text-[#666]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-6 overflow-hidden rounded-[28px] lg:mx-0 lg:ml-12 lg:rounded-none lg:rounded-l-[28px]"
      >
        <img src={cta.image} alt={cta.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20" />

        <div className="relative flex min-h-[380px] flex-col justify-end p-10">
          <p className="mb-3 text-xs uppercase tracking-[3px] text-[#C8A96A]">{cta.eyebrow}</p>
          <h3 className="mb-4 font-serif text-3xl leading-tight text-[#111111] md:text-4xl">{cta.title}</h3>
          <p className="mb-8 max-w-sm text-sm leading-7 text-[#666]">{cta.description}</p>

          <motion.a
            href={cta.primaryButton.href}
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C8A96A] px-7 py-3.5 text-sm font-semibold uppercase tracking-[1px] text-black transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {cta.primaryButton.label}
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactFAQAndCTA;