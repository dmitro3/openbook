import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import SwiperCore,{ Navigation,Autoplay} from "swiper";

import Image from 'next/image'
import { useRouter } from "next/router";

const swiperImageNames = ['Esport_Betting.jpg',"Online_Betting.jpg",'NBA_Betting.jpg','EPL_Betting.jpg','Esport_Betting_2.jpeg'];
const swiperImageUrls = ['#','#','/Matches/Basketball/NBA','Matches/Soccer/EPL','#']

export const CustomSwiper = (props) => {
  SwiperCore.use([Autoplay]);
  const router = useRouter();

  return (
    <>
      
      <Swiper
        ref={props.swiperRef}
        navigation={false}
        modules={[Autoplay]}
        className="feature-page-pictures-swiper"
        style={{paddingTop:'0px',width:'95%',borderRadius:"25px"}}
        spaceBetween={5}
        onClick={(s,e)=>{s.clickedSlide.click()}}
        slidesPerView={Number(props.slideCount+0.2)}
        // centeredSlides={true}
        autoplay={{
          delay: 1,
        }}
        loop={true}
        speed={
          10000
        }
        preloadImages={true}
        lazy={false}
      >
      
        {swiperImageNames.map((item,index)=>{
          return(<SwiperSlide className="swiper-slide-featured-top" key={index} onClick={()=>{router.push(swiperImageUrls[index])}}><Image src={`/static/images/featured_page_pictures/${item}`} layout='fill'/></SwiperSlide>)
        })}
        

      </Swiper>
    </>
  );
}