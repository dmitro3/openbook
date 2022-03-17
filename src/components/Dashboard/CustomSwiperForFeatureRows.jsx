import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper";
import {Typography} from "@mui/material"
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from "react-icons/md";


import "swiper/css";
import "swiper/css/navigation";

import FeaturedMatchCard from "./FeaturedMatchCard";



export default function CustomSwiperForFeatureRows(props) {
    const [my_swiper, set_my_swiper] = useState({});

  return (
    <>
        <div style={{width:"100%",textAlign:'right',paddingRight:'20px',display:'flex',paddingBottom:'0px',marginTop:'20px'}}>
        <Typography  sx={{marginLeft:'20px',paddingTop:'30px',paddingBottom:'20px',fontSize:'17px', fontWeight:'500',marginTop:'auto'}}>{`${props.sport_key} / ${props.league_name}`}</Typography>
        <button className="custom-feature-swpier-button custom-feature-swpier-prev-button" onClick={()=>{my_swiper.slidePrev()}}><MdOutlineNavigateBefore className="custom-feature-swpier-button-inner-svg"/></button>
        <button className="custom-feature-swpier-button custom-feature-swpier-next-button" onClick={()=>{my_swiper.slideNext()}}><MdOutlineNavigateNext className="custom-feature-swpier-button-inner-svg"/></button>
        <style>{`
        .custom-feature-swpier-button{
          margin-right: 10px;
          border-radius: 50%;
          background-color: white;
          border: none;
          padding: 5px;
          height: fit-content;
          margin-top: auto;
          cursor:pointer;
          padding-top: 3px;
          padding-bottom: 3px;
        }
        .custom-feature-swpier-prev-button{
          margin-left: auto;

        }
        .custom-feature-swpier-next-button{

        }
        .custom-feature-swpier-button:hover{
          background-color:black;
          color:white;
        }
        .custom-feature-swpier-button-inner-svg{
          font-size:18px;
        }
        `}</style>
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