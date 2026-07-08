import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { collections } from "./collectionData";
import CollectionCard from "./CollectionCard";
import { containerVariants } from "./collectionVariants";

function CollectionSlider() {
  return (
    <motion.div
      variants={containerVariants}
      className="relative"
    >
      {/* Navigation */}
      <div className="absolute -top-24 right-0 z-20 hidden items-center gap-4 lg:flex">
        <button className="collection-prev flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A]/30 bg-white transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-white">
          <ChevronLeft size={20} />
        </button>

        <button className="collection-next flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A96A]/30 bg-white transition-all duration-300 hover:border-[#C8A96A] hover:bg-[#C8A96A] hover:text-white">
          <ChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".collection-prev",
          nextEl: ".collection-next",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        spaceBetween={30}
        centeredSlides={false}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 2.5,
          },

          1280: {
            slidesPerView: 3,
          },
        }}
        className="collectionSwiper overflow-visible"
      >
        {collections.map((collection, index) => (
          <SwiperSlide key={collection.id}>
            <CollectionCard
              collection={collection}
              dark={index % 2 === 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

export default CollectionSlider;