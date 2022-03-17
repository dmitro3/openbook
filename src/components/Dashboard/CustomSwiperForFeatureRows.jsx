import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper";
import {Button} from "@mui/material"


import "swiper/css";
import "swiper/css/navigation";

import FeaturedMatchCard from "./FeaturedMatchCard";


export default function CustomSwiperForFeatureRows(props) {
    const [my_swiper, set_my_swiper] = useState({});

  return (
    <>
        <div style={{width:"100%",textAlign:'right',paddingRight:'20px',display:'flex'}}>
        <Button sx={{marginLeft:'auto',marginRight:'10px',borderRadius: '8'}} variant="contained" onClick={()=>{my_swiper.slidePrev()}}>{'<'}</Button>
        <Button variant="contained" onClick={()=>{my_swiper.slideNext()}}>{'>'}</Button>
        </div>
        
        <Swiper
            onInit={(ev) => {
            set_my_swiper(ev)
            }}
            cssMode={true}
            navigation={false}
            mousewheel={true}
            keyboard={true}
            modules={[Mousewheel, Keyboard]}
            className="feature-page-pictures-swiper"
            style={{paddingTop:'0px',marginLeft:'20px',marginRight:'20px'}}
            slidesPerView={'3'}
            spaceBetween={30}
            shortSwipes={false}
        >
        {
            props.league_data.slice(0,8).map((match) => {
            let datetime = new Date(match.timestamp);
            let dateStringForProps=datetime.toLocaleString('default', { month: 'short', day:'numeric' })
            let timeStringForProps=datetime.toLocaleString('default', { hour: 'numeric', minute:'numeric',  hourCycle: 'h23' })
            return  (
                <SwiperSlide key={match.id} style={{borderRadius:"10px",overflow:'auto'}} >
                    <FeaturedMatchCard 
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