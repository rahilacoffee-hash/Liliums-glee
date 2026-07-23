// ProductFAQ.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

function ProductFAQ({ faq }) {
  let [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="border-t border-[#E8E2D9] bg-white py-20">
      <div className="container-custom mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-serif text-3xl text-[#111111] md:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faq.map((item) => {
            let isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F5F0]"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-[#111111]">{item.question}</span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 text-[#C8A96A]"
                  >
                    <Plus size={18} />
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
                      <p className="px-6 pb-5 text-sm leading-7 text-[#666]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductFAQ;