import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeUp,
  faqItem,
} from "./collectionsVariants";

function CollectionsFAQ() {
  const { faq } = collectionsData;

  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">
        {/* ================= Header ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            Frequently Asked Questions
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            Everything You
            <br />
            Need To Know.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            Have questions about our collections, delivery, installation, or
            custom orders? We've answered some of the most common ones below.
          </motion.p>
        </motion.div>

        {/* ================= FAQ ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-6"
        >
          {faq.map((item, index) => (
            <motion.div
              key={item.id}
              variants={faqItem}
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-[#E7E1D7]
                bg-white
                shadow-sm
              "
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-6
                  p-8
                  text-left
                "
              >
                <h3 className="font-serif text-2xl text-[#111111]">
                  {item.question}
                </h3>

                <motion.div
                  animate={{
                    rotate: active === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F8F5F0]
                    text-[#C8A96A]
                  "
                >
                  {active === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="leading-8 text-[#666666]">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CollectionsFAQ;