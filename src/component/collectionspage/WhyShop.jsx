import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeLeft,
  fadeRight,
  fadeUp,
  featureCard,
} from "./collectionsVariants";

const iconMap = {
  "Premium Quality": Award,
  "Curated Collections": Sparkles,
  "Secure Shopping": ShieldCheck,
  "Nationwide Delivery": Truck,
};

function WhyShop() {
  const { whyShop } = collectionsData;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid items-center gap-20 lg:grid-cols-[0.95fr_1.05fr]"
        >
          {/* ================= Left ================= */}

          <motion.div variants={fadeLeft}>
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
            >
              Why Shop With Us
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
            >
              Designed For
              <br />
              Beautiful Living.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-9 text-[#666666]"
            >
              We source premium interior products that blend exceptional
              craftsmanship with timeless design, helping you create spaces
              you'll love for years to come.
            </motion.p>

            {/* Stats */}

            <motion.div
              variants={fadeUp}
              className="mt-14 grid grid-cols-2 gap-6"
            >
              <div className="rounded-[28px] bg-[#F8F5F0] p-8">
                <h3 className="font-serif text-4xl text-[#111111]">
                  500+
                </h3>

                <p className="mt-2 text-[#666666]">
                  Happy Clients
                </p>
              </div>

              <div className="rounded-[28px] bg-[#F8F5F0] p-8">
                <h3 className="font-serif text-4xl text-[#111111]">
                  100%
                </h3>

                <p className="mt-2 text-[#666666]">
                  Premium Quality
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= Right ================= */}

          <motion.div
            variants={fadeRight}
            className="grid gap-6 sm:grid-cols-2"
          >
            {whyShop.map((item) => {
              const Icon = iconMap[item.title];

              return (
                <motion.div
                  key={item.id}
                  variants={featureCard}
                  whileHover="whileHover"
                  className="
                    rounded-[30px]
                    border
                    border-[#ECE6DB]
                    bg-[#F8F5F0]
                    p-8
                    transition-all
                    duration-300
                    hover:border-[#C8A96A]
                    hover:shadow-xl
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                    "
                  >
                    <Icon
                      size={24}
                      className="text-[#C8A96A]"
                    />
                  </div>

                  <h3 className="mt-8 font-serif text-2xl text-[#111111]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-[#666666]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyShop;