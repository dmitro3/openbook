import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Mousewheel, Keyboard } from "swiper";

import Image from 'next/image'

export default function CustomSwiper() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="feature-page-pictures-swiper"
        style={{paddingTop:'0px',marginLeft:'20px',marginRight:'20px'}}
        slidesPerView={'3'}
        spaceBetween={30}
        loop={true}
      >
      
        {['NBA_Betting.jpg','EPL_Betting.jpg','Esport_Betting_2.jpeg','Esport_Betting.jpg',"Online_Betting.jpg"].map((item,index)=>{
          return(<SwiperSlide key={index} style={{borderRadius:"30px",overflow:'auto',width:'770px',height:'350px'}} ><Image src={`/static/images/featured_page_pictures/${item}`} layout='fill'/></SwiperSlide>)
        })}
        

      </Swiper>
    </>
  );
}