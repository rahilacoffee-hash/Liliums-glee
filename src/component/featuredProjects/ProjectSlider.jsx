import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import axiosInstance from "../../api/axiosInstance";
import { imageReveal } from "./projectVariants";
import ProjectCard from "./ProjectCard";
import ProjectProgress from "./ProjectProgress";

function ProjectSlider() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await axiosInstance.get("/project", { params: { featuredOnly: true } });
        setProjects(data.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="h-[650px]" />;
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="absolute -top-24 right-0 z-20 hidden items-center gap-4 lg:flex">
        <button className="project-prev flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A]/40 bg-white transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-white">
          <ChevronLeft size={20} />
        </button>

        <button className="project-next flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A]/40 bg-white transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-white">
          <ChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrent(swiper.realIndex);
        }}
        navigation={{
          prevEl: ".project-prev",
          nextEl: ".project-next",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 1.05 },
          1024: { slidesPerView: 1.15 },
          1440: { slidesPerView: 1.2 },
        }}
        className="projectSwiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[32px]"
            >
              <div className="overflow-hidden rounded-[32px]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-[650px] w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <ProjectCard project={project} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <ProjectProgress
        current={current}
        total={projects.length}
        onSelect={(index) => swiperRef.current?.slideToLoop(index)}
      />
    </div>
  );
}

export default ProjectSlider;