import { motion } from "framer-motion";
import {
  Award,
  Gem,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import servicesData from "./servicesData";

import {
  staggerContainer,
  featureCard,
  fadeUp,
} from "./servicesVariants";

const icons = [
  Award,
  Gem,
  ShieldCheck,
  HeartHandshake,
];

function WhyChooseServices() {
  const { whyChoose } = servicesData;

  return (
    <section className="bg-[#0F1713] py-24 md:py-32">
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
            Why Choose Liliums Glee
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl leading-tight text-white md:text-5xl"
          >
            Designed With Care.
            <br />
            Delivered With Excellence.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70"
          >
            Every project reflects our commitment to thoughtful design,
            premium craftsmanship, and an experience centered around you.
          </motion.p>
        </motion.div>

        {/* ================= Features ================= */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {whyChoose.map((item, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={item.id}
                variants={featureCard}
                whileHover="whileHover"
                className="
                  group
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-[#C8A96A]/40
                  hover:bg-white/10
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C8A96A]/20
                    bg-[#C8A96A]/10
                    transition-all
                    duration-300
                    group-hover:bg-[#C8A96A]
                  "
                >
                  <Icon
                    size={28}
                    className="
                      text-[#C8A96A]
                      transition-colors
                      duration-300
                      group-hover:text-[#111111]
                    "
                  />
                </div>

                <h3 className="mt-8 font-serif text-2xl text-white">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-white/65">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= Bottom Statement ================= */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mx-auto
            mt-24
            max-w-4xl
            border-t
            border-white/10
            pt-12
            text-center
          "
        >
          <p className="font-serif text-3xl italic leading-relaxed text-white md:text-4xl">
            "We don't just design beautiful interiors—
            <span className="text-[#C8A96A]">
              {" "}we create spaces you'll love coming home to.
            </span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseServices;