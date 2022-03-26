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
import {setOdds} from "@actions/oddsActions"

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
        <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />        
        </Box>

        <Box
            sx={{
            py: 3,
            display: 'flex'
            }}>

            <FeaturedSportPage isSlipOpened={isSlipOpened} data={data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />
        </Box>
        <BetslipSideDrawer setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}/>
        </Box>
    </>
)};

const mapStateToProps = (state) => {
    return{
        odds: state.odds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
