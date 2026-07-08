import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { featuredProjects } from "./projectData";
import { imageReveal } from "./projectVariants";
import ProjectCard from "./ProjectCard";
import ProjectProgress from "./ProjectProgress";

function ProjectSlider() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

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
          768: {
            slidesPerView: 1.05,
          },
          1024: {
            slidesPerView: 1.15,
          },
          1440: {
            slidesPerView: 1.2,
          },
        }}
        className="projectSwiper"
      >
        {featuredProjects.map((project) => (
          <SwiperSlide key={project.id}>
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[32px]"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-[32px]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-[650px] w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating Card */}
              <ProjectCard project={project} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Progress */}
      <ProjectProgress
        current={current}
        total={featuredProjects.length}
        onSelect={(index) => swiperRef.current?.slideToLoop(index)}
      />
    </div>
  );
}

export default ProjectSlider;