import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Mousewheel, Keyboard } from "swiper";

import Image from 'next/image'

export const CustomSwiper = () => {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="feature-page-pictures-swiper"
        style={{paddingTop:'0px',width:'95%'}}
        slidesPerView={'3'}
        spaceBetween={30}
        loop={true}
      >
      
        {['NBA_Betting.jpg','EPL_Betting.jpg','Esport_Betting_2.jpeg','Esport_Betting.jpg',"Online_Betting.jpg"].map((item,index)=>{
          return(<SwiperSlide key={index} style={{borderRadius:"30px",overflow:'auto',width:'770px',height:'350px',cursor:'pointer'}} ><Image style={{cursor:'pointer'}} src={`/static/images/featured_page_pictures/${item}`} layout='fill'/></SwiperSlide>)
        })}
        

      </Swiper>
    </>
  );
}