import Head from "next/head";
import { Box} from "@mui/material";
import { DashboardLayout } from "@components/Navigation/DashboardLayout";
import { BetslipSideDrawerEmptyModal } from "@components/Betting/Betslip/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Betting/Betslip/BetslipSideDrawer"
import { useState,useEffect,useLayoutEffect} from "react"
import { FeaturedSportPage } from "@components/Betting/Feature/FeaturedSportPage";
import {CustomSwiper} from "@components/Betting/Feature/CustomSwiper" 
import { HeroBanner } from "@components/Betting/Feature/HeroBanner";
import { SportsBookPageSkeleton } from "@components/Betting/Sportbook/SportsBookPageSkeleton";
import BottomBetSlipDrawer from "@components/Betting/Betslip/BottomBetSlipDrawer";
import useWindowDimensions from '@hooks/useWindowDimension';
import { getSwiperSlideCountByScreenWidthTeamCards, getSwiperSlideCountByScreenWidth } from "@utils/getSwiperSlideCountByScreenWidth";

// Redux Dependencies
import {connect} from "react-redux"
import { setBetSlipOpen } from "redux/actions/settingsActions";
import {useRef} from "react"

const Featured = (props) => 
{
    const swiperRef = useRef(null)
    const { height, width } = useWindowDimensions();
    const [slideCountTeamCard,setSlideCountTeamCard] = useState(1);
    const [slideCount,setSlideCount] = useState(1);

    let data = props.odds.unformattedOddsDict;
    let rb = ""
    useEffect(()=>{
        rb = new ResizeObserver(() => {resetAutoPlay()})
        rb.observe(swiperRef.current);
    },[])

    const resetAutoPlay = ()=>{
        if(swiperRef.current.swiper){
            swiperRef.current.swiper.autoplay.stop();
            setTimeout(()=>{
                swiperRef.current.swiper.autoplay.start();
            },200)
        }
    }

    const handleResize = () =>{
        setSlideCount(getSwiperSlideCountByScreenWidth())
        setSlideCountTeamCard(getSwiperSlideCountByScreenWidthTeamCards())
      }
  
    //componentDidMount
    useLayoutEffect(()=>{
    setSlideCount(getSwiperSlideCountByScreenWidth())
    setSlideCountTeamCard(getSwiperSlideCountByScreenWidthTeamCards())
    window.addEventListener("resize", handleResize);
    },[])

    //componentDidUnmount
    useLayoutEffect( () => () => {
        window.removeEventListener("resize", handleResize);
        rb.disconnect();
    }, [] );

    return (
    <>
    <Head>
        <title>Home | OpenBook</title>
    </Head>
        
        <Box
            component="main"
            sx={{px:'10px'}}
        >
        <Box
            sx={{
            paddingTop: {md: 8, xs: 4},
            display: 'flex',
            justifyContent: "center"
            }}
        >
        <CustomSwiper swiperRef={swiperRef} slideCount={slideCount}/>
        <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />    
        </Box>
        <Box
            sx={{
            display: 'flex'
            }}
        >
        <HeroBanner />
        <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />    
        </Box>

            <Box
                sx={{
                py: 3,
                display: 'flex'
                }}>
                {
                    props.odds.isOddsLoading ? 
                    <SportsBookPageSkeleton/> : 
                    <>
                        <FeaturedSportPage isSlipOpened={props.settings.isBetSlipOpen} data={data} slideCount={slideCountTeamCard}/>
                        <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />  
                    </>
                }
            </Box>    


        
            { width > 900 ?  <BetslipSideDrawer setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}/> : <BottomBetSlipDrawer setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}/>}
        </Box> 
        
    </>
)};

const mapStateToProps = (state) => {
    return{
        odds: state.odds,
        settings: state.settings
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setBetSlipOpen: (isBetSlipOpen) => {
            dispatch(setBetSlipOpen(isBetSlipOpen));
          },
    };
};

Featured.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
