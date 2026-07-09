import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

import servicesData from "./servicesData";

import {
  staggerContainer,
  serviceCard,
  fadeUp,
} from "./servicesVariants";

function ServicesGrid() {
  const { services } = servicesData;

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
            What We Do
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-[#111111] md:text-5xl"
          >
            Crafted Services,
            <br />
            Designed Around You.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#666666]"
          >
            Every project is approached with creativity, precision, and a
            commitment to delivering timeless interiors that reflect your
            lifestyle.
          </motion.p>
        </motion.div>

        {/* ================= Services ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-2"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={serviceCard}
              whileHover="whileHover"
              className="group overflow-hidden rounded-[32px] border border-[#E7E1D7] bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}

              <div className="p-8 md:p-10">

                <h3 className="font-serif text-3xl text-[#111111]">
                  {service.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-[#666666]">
                  {service.description}
                </p>

                {/* Features */}

                <div className="mt-8 flex flex-wrap gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F8F5F0] px-4 py-2 text-sm text-[#444]"
                    >
                      <Check
                        size={14}
                        className="text-[#C8A96A]"
                      />

                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}

                <Link
                  to={`/services/${service.slug}`}
                  className="group/link mt-10 inline-flex items-center gap-3 font-medium text-[#111111]"
                >
                  Learn More

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesGrid;