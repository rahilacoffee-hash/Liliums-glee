import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import servicesData from "./servicesData";

import {
  staggerContainer,
  fadeUp,
  faqItem,
} from "./servicesVariants";

function ServicesFAQ() {
  const { faq } = servicesData;

  const [activeIndex, setActiveIndex] = useState(0);

  function handleToggle(index) {
    setActiveIndex((prev) => (prev === index ? null : index));
  }

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
            Everything You Need
            <br />
            To Know.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            We've answered some of the questions clients ask most
            before starting their interior design journey with us.
          </motion.p>
        </motion.div>

        {/* ================= FAQ ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {faq.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                variants={faqItem}
                className="border-b border-[#E7E1D7]"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between py-8 text-left"
                >
                  <h3 className="pr-6 font-serif text-xl text-[#111111] md:text-2xl">
                    {item.question}
                  </h3>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#E7E1D7]
                      bg-white
                    "
                  >
                    {isOpen ? (
                      <Minus
                        size={18}
                        className="text-[#C8A96A]"
                      />
                    ) : (
                      <Plus
                        size={18}
                        className="text-[#111111]"
                      />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pr-16 text-lg leading-9 text-[#666666]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesFAQ;