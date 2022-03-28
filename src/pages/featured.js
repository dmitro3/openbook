import Head from "next/head";
import { Box} from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState,useEffect} from "react"
import { FeaturedSportPage } from "@components/Dashboard/FeaturedSportPage";
import {CustomSwiper} from "@components/Dashboard/CustomSwiper" 

// Redux Dependencies
import {connect} from "react-redux"
import { setBetSlipOpen } from "@actions/settingsActions";

const Dashboard = (props) => 
{
    const [isSlipOpened, setSlipOpen] = useState(false);
    let data = props.odds.unformattedOddsDict;

    return (
    <>
    <Head>
        <title>Home | OpenEdge</title>
    </Head>
        <Box
            component="main"
        >
        <Box
            sx={{
            paddingTop: 8,
            display: 'flex'
            }}
        >
        <CustomSwiper/>
        <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />    
        </Box>

        <Box
            sx={{
            py: 3,
            display: 'flex'
            }}>

            <FeaturedSportPage isSlipOpened={props.settings.isBetSlipOpen} data={data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />  
        </Box>
        
            <BetslipSideDrawer setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}/>
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

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
