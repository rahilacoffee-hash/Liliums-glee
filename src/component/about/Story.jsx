import { motion } from "framer-motion";

import aboutData from "./aboutData";

import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  floatingImage,
} from "./aboutVariants";

function Story() {
  const { story } = aboutData;

  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid items-center gap-20 lg:grid-cols-2"
        >
          {/* ========================= */}
          {/* Image */}
          {/* ========================= */}

          <motion.div
            variants={fadeLeft}
            className="relative"
          >
            <motion.div
              variants={floatingImage}
              animate="animate"
              className="overflow-hidden rounded-[32px]"
            >
              <img
                src={story.image}
                alt={story.title}
                className="
                  h-[650px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </motion.div>

            {/* Decorative Card */}

            <div
              className="
                absolute
                -right-6
                bottom-10
                hidden
                rounded-3xl
                border
                border-[#E8E2D9]
                bg-white
                p-6
                shadow-xl
                lg:block
              "
            >
              <p className="text-xs uppercase tracking-[3px] text-[#C8A96A]">
                Since
              </p>

              <h3 className="mt-2 font-serif text-4xl text-[#111111]">
                2026
              </h3>

              <p className="mt-2 text-sm text-[#777777]">
                Passion. Craftsmanship. Excellence.
              </p>
            </div>
          </motion.div>

          {/* ========================= */}
          {/* Content */}
          {/* ========================= */}

          <motion.div variants={fadeRight}>
            <motion.span
              variants={fadeUp}
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[4px]
                text-[#C8A96A]
              "
            >
              {story.eyebrow}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="
                mt-6
                max-w-xl
                font-serif
                text-4xl
                leading-tight
                text-[#111111]
                md:text-5xl
              "
            >
              {story.title}
            </motion.h2>

            <div className="mt-8 space-y-7">
              {story.description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className="
                    text-lg
                    leading-9
                    text-[#666666]
                  "
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Divider */}

            <motion.div
              variants={fadeUp}
              className="my-10 h-px w-28 bg-[#C8A96A]"
            />

            {/* Quote */}

            <motion.blockquote
              variants={fadeUp}
              className="
                border-l-2
                border-[#C8A96A]
                pl-6
                font-serif
                text-2xl
                italic
                leading-relaxed
                text-[#111111]
              "
            >
              "Every space tells a story. Our role is to make yours
              unforgettable."
            </motion.blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Story;