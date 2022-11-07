import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function Banner() {
  return (
    <div className='relative'>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading='lazy' src="https://fakeimg.pl/1591x512/?retina=1&text=こんにちは&font=noto" />
        </div>
        <div>
          <img loading='lazy' src="https://fakeimg.pl/1591x512/ff0000,128" />
        </div>
        <div>
          <img loading='lazy' src="https://fakeimg.pl/1591x512/?retina=1&text=にこちは&font=noto" />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner