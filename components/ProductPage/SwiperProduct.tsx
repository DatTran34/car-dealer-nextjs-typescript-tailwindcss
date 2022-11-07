import React from 'react'
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ICar } from "../Types/model";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

function SwiperProduct({ car }: { car: ICar }) {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

console.log()
  return (
    <div className='w-full'>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {[1, 2, 3, 4, 5].map((carImage, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="object-contain"
              src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${car.model_make_id}&modelFamily=${car.model_name}&paintId=pspc0014&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
              alt="as"
            />
          </SwiperSlide>
        ))}


      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5].map((carImage, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="object-contain"
              src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${car.model_make_id}&modelFamily=${car.model_name}&paintId=pspc0014&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
              alt="as"
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}

export default SwiperProduct