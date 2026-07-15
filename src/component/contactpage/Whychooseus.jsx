import { motion } from "framer-motion";
import { UserCheck, Gem, Sofa, Truck } from "lucide-react";

import contactData from "./contactData";
import { fadeLeft, fadeUp, staggerContainer, iconHover } from "./contactVariants";

let icons = [UserCheck, Gem, Sofa, Truck];

function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="container-custom mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">

          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-serif text-3xl leading-tight text-[#111111] md:text-4xl">
              Why Work<br />With Us?
            </h2>
            <div className="mt-4 h-px w-14 bg-[#C8A96A]" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {contactData.whyChoose.map((item, i) => {
              let Icon = icons[i % icons.length];
              return (
                <motion.div key={item.id} variants={fadeUp}>
                  <motion.div
                    variants={iconHover}
                    whileHover="hover"
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5F0] text-[#C8A96A]"
                  >
                    <Icon size={22} />
                  </motion.div>
                  <h3 className="mb-2 font-medium text-[#111111]">{item.title}</h3>
                  <p className="text-sm leading-6 text-[#666]">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;