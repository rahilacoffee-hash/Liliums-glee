import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import servicesData from "./servicesData";

import {
  staggerContainer,
  fadeLeft,
  fadeRight,
  fadeUp,
} from "./servicesVariants";

function OurExpertise() {
  const { services } = servicesData;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">
        {/* ================= Header ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[4px] text-[#C8A96A]"
          >
            Our Expertise
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            Expertise That Shapes
            <br />
            Exceptional Spaces.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            Every service is delivered with thoughtful planning,
            premium materials, and meticulous craftsmanship to
            create interiors that feel timeless.
          </motion.p>
        </motion.div>

        {/* ================= Services ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-32"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`
                grid
                items-center
                gap-14
                lg:grid-cols-2
                ${
                  index % 2 !== 0
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }
              `}
            >
              {/* Image */}

              <motion.div
                variants={
                  index % 2 === 0
                    ? fadeLeft
                    : fadeRight
                }
                className="group overflow-hidden rounded-[32px]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    h-[600px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />
              </motion.div>

              {/* Content */}

              <motion.div
                variants={
                  index % 2 === 0
                    ? fadeRight
                    : fadeLeft
                }
              >
                <span className="text-sm uppercase tracking-[4px] text-[#C8A96A]">
                  0{index + 1}
                </span>

                <h3 className="mt-4 font-serif text-4xl text-[#111111] md:text-5xl">
                  {service.title}
                </h3>

                <p className="mt-8 text-lg leading-9 text-[#666666]">
                  {service.description}
                </p>

                {/* Features */}

                <div className="mt-10 space-y-4">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5F0]">
                        <CheckCircle2
                          size={18}
                          className="text-[#C8A96A]"
                        />
                      </div>

                      <span className="text-[#444444]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}

                <Link
                  to="/contact"
                  className="
                    group
                    mt-12
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#111111]
                    px-7
                    py-4
                    text-sm
                    font-medium
                    uppercase
                    tracking-[2px]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#C8A96A]
                    hover:text-[#111111]
                  "
                >
                  Book Consultation

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
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default OurExpertise;