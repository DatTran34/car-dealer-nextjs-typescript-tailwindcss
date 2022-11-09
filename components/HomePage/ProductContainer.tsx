import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICar } from "../Types/model";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Pagination } from "swiper";
// import required modules
import { Navigation } from "swiper";
import { ArrowLeft, ArrowRight } from "../Icon";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function ProductContainer({ cars, brand, color }: { cars: ICar[]; brand: string; color: string }) {
  const swiperRef = useRef<SwiperCore>();
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className={`relative flex flex-col px-5 py-16 md:px-20  space-y-2 group h-screen snap-center ${(color == "black") ? "bg-[#232323]" : "bg-[#f2e8de]"}`}>
      <div className="flex flex-col space-y-3 md:space-x-0 md:flex-row justify-between items-start md:items-end">
        <h4 className={`text-4xl uppercase ${(color == "black") ? "text-[#f2e8de]" : "text-[#232323]"}`}>{brand}</h4>
        <h3 className="text-gray-400">
          <Link
            href={{
              pathname: "/filterPage",
              query: { brand: brand }, // the data
            }}
          >
            <div className={`underline ${(color == "black") ? "text-[#f2e8de]" : "text-[#232323]"}`}>Discover More</div>
          </Link>
        </h3>
      </div>

      <div className={"flex-grow relative "}>
        <button
          className="absolute inset-y-1/2 -left-10 z-10 cursor-pointer bg-white text-gray-500 hidden md:group-hover:flex hover:bg-[#dd981c] rounded-full w-7 h-7 hover:text-white text-sm items-center justify-center"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft />
        </button>
        <button
          className="absolute inset-y-1/2 -right-10 z-10 cursor-pointer bg-white text-gray-500 hidden md:group-hover:flex hover:bg-[#dd981c] rounded-full w-7 h-7 hover:text-white text-sm items-center justify-center"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight />
        </button>
        <motion.div
          variants={container}
          initial={"hidden"}
          whileInView="visible"
          className="w-full h-full bg-white flex flex-rows items-center justify-center"
        >
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            grabCursor={true}
            className="mySwiper"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {cars.map((car, i) => {
              if (car.model_make_id === brand) {
                return (
                  <motion.div variants={item}  key={i} className="w-10 h-10">
                    <SwiperSlide>
                      <ProductCard car={car} color={color} />
                    </SwiperSlide>
                  </motion.div>
                );
              }
            })}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductContainer;
