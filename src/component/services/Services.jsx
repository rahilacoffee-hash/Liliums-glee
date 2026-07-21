import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import ServiceRow from "./ServiceRow";
import servicesData from "./serviceData";

function Services() {
  let [services, setServices] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        let { data } = await axiosInstance.get("/service");
        setServices(data.data);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <section className="bg-[#F7F4EF] py-32 lg:py-40">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[4px] text-[#C8A96A]">
            {servicesData.eyebrow}
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#111111] md:text-6xl">
            {servicesData.title}
            <span className="block text-[#C8A96A]">{servicesData.highlight}</span>
          </h2>

          <div className="mx-auto my-8 h-px w-20 bg-[#C8A96A]" />

          <p className="mx-auto max-w-2xl text-lg leading-9 text-[#666666]">
            {servicesData.description}
          </p>
        </motion.div>

        {/* Services */}
        {!loading && (
          <div className="space-y-40">
            {services.map((service, index) => (
              <ServiceRow key={service._id} service={service} reverse={index % 2 !== 0} />
            ))}
          </div>
        )}

        <Link to="/services">
          <button className="group mt-12 flex items-center gap-5">
            <span className="font-medium tracking-wide">Discover Service</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A] transition-all duration-300 group-hover:bg-[#C8A96A] group-hover:text-white">
              <ArrowRight size={18} />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Services;