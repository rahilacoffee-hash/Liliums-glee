import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ServiceRow({ service, reverse = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={`grid items-center gap-16 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="group overflow-hidden rounded-[36px]">
        <img
          src={service.image}
          alt={service.title}
          className="h-[620px] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="max-w-xl">
        <p className="mb-3 text-xs uppercase tracking-[4px] text-[#C8A96A]">
          {service.number}
        </p>

        <h3 className="font-serif text-5xl leading-tight text-[#111111]">
          {service.title}
        </h3>

        <div className="my-8 h-px w-20 bg-[#C8A96A]" />

        <p className="text-lg leading-9 text-[#666]">
          {service.description}
        </p>

        {/* Features */}

        <div className="mt-10 grid grid-cols-2 gap-5">
          {service.features.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-[#C8A96A]" />

              <span className="text-[#333]">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}

        <button className="group mt-12 flex items-center gap-5">
          <span className="font-medium tracking-wide">
            Discover Service
          </span>

          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A] transition-all duration-300 group-hover:bg-[#C8A96A] group-hover:text-white">
            <ArrowRight size={18} />
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default ServiceRow;