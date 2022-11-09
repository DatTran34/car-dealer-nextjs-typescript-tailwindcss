import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import banner_1 from "../../banner_1.png"
import banner_2 from "../../banner_2.png"
import banner_3 from "../../banner_3.png"
function Banner() 
{
  return (
    <div className='relative'>
      <Carousel
        autoPlay={true}
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading='lazy' src={banner_1.src} />
        </div>
        <div>
          <img loading='lazy' src={banner_2.src} />
        </div>
        <div>
          <img loading='lazy' src={banner_3.src} />
        </div>
      </Carousel>
    </div>
  )
}

//https://fakeimg.pl/1591x512/?retina=1&text=にこちは&font=noto
export default Banner