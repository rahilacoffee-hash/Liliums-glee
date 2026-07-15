import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import collectionsData from "./collectionsData";

import {
  staggerContainer,
  fadeLeft,
  fadeRight,
  fadeUp,
  featureCard,
} from "./collectionsVariants";

function FeaturedCollection() {
  const { featuredCollection } = collectionsData;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid
            items-center
            overflow-hidden
            rounded-[40px]
            bg-[#111111]
            lg:grid-cols-2
          "
        >
          {/* ================= Image ================= */}

          <motion.div
            variants={fadeLeft}
            className="relative h-[450px] lg:h-[700px]"
          >
            <img
              src={featuredCollection.image}
              alt={featuredCollection.title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/30" />

            {/* Floating Badge */}

            <motion.div
              variants={featureCard}
              whileHover="whileHover"
              className="
                absolute
                left-8
                top-8
                rounded-full
                border
                border-white/20
                bg-white/10
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <span className="text-xs font-semibold uppercase tracking-[3px] text-white">
                Featured Collection
              </span>
            </motion.div>
          </motion.div>

          {/* ================= Content ================= */}

          <motion.div
            variants={fadeRight}
            className="p-10 md:p-16 lg:p-20"
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
            >
              {featuredCollection.eyebrow}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="
                mt-6
                font-serif
                text-4xl
                font-light
                leading-tight
                text-white
                md:text-5xl
              "
            >
              {featuredCollection.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-white/70
              "
            >
              {featuredCollection.description}
            </motion.p>

            {/* Features */}

            <motion.div
              variants={fadeUp}
              className="mt-10 space-y-5"
            >
              {[
                "Premium imported quality",
                "Elegant timeless finishes",
                "Suitable for residential & commercial spaces",
                "Professional installation available",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C8A96A]" />

                  <span className="text-white/80">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Button */}

            <motion.div
              variants={fadeUp}
              className="mt-12"
            >
              <Link
                to={featuredCollection.button.href}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#C8A96A]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-[#111111]
                  transition-all
                  duration-300
                  hover:bg-[#d4b57b]
                "
              >
                {featuredCollection.button.label}

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCollection;