import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper";
import Image from 'next/image'

import "swiper/css";
import "swiper/css/navigation";

import MatchCard from "@components/Dashboard/MatchCard";


export default function CustomSwiperForFeatureRows() {
    let data = require('../../../odds.json');
    let EPL_data = data.Soccer.EPL;

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
      >
      


        {
            EPL_data.slice(0,5).map((match) => {
            let datetime = new Date(match.timestamp);
            let dateStringForProps=datetime.toLocaleString('default', { month: 'short', day:'numeric' })
            let timeStringForProps=datetime.toLocaleString('default', { hour: 'numeric', minute:'numeric',  hourCycle: 'h23' })
            return  (
                <SwiperSlide key={match.id} style={{borderRadius:"10px",overflow:'auto'}} >
                    <MatchCard 
                    key={match.id}
                    match1={match.match[0]} 
                    match2={match.match[1]} 
                    outcomes={match.outcomes}
                    dateString={dateStringForProps}  
                    timeString={timeStringForProps}  
                    matchId={match.id}
                    />
                </SwiperSlide>
                )
            })
        }
        

      </Swiper>
    </>
  );
}