import React, { useRef } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Autoplay, EffectCards, FreeMode} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import { ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';

const SwiperComp = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null)
    const Swides = [
      {title: "Slide 1", src:"/img0.webp"},
      {title: "Slide 2", src:"/img1.webp"},
        {title: "Slide 3", src:"/img2.webp"},
    ]

  return (
    <>
      <div className=" relative w-full p-2 max-md:h-[300px] h-[400px]">

          <Swiper
          className='h-full w-full'
            modules={[ EffectCards,Navigation, Pagination, Autoplay]}
            loop={true}
            spaceBetween={20}
            speed={2000}
            navigation={{
              nextEl:".my-custom-next",
              prevEl:".my-custom-prev"
            }}
            pagination={{clickable: true}} 
            autoplay={{delay: 2000, disableOnInteraction: false}}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            slidesPerView={1}     
            slidesPerGroup={1}
          >
            
            
            {Swides.map((item,e) => (
              <SwiperSlide key={e}
              className='relative'>
                  <img src={item.src} 
                  className='w-full h-full object-contain cursor-grab' />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </>
  )
}

export default SwiperComp