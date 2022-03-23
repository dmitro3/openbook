import Head from "next/head";
import { Box} from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState,useEffect} from "react"
import { FeaturedSportPage } from "@components/Dashboard/FeaturedSportPage";
import {CustomSwiper} from "@components/Dashboard/CustomSwiper" 
import {getOdds} from "@utils/getOdds"

// Redux Dependencies
import {connect} from "react-redux"
import {setOdds} from "@actions/oddsActions"

let data = require('@root/odds.json');

const Dashboard = (props) => 
{
    const [isSlipOpened, setSlipOpen] = useState(false);
    useEffect(()=>{
        const oddsData = getOdds();
        props.setOdds(oddsData);
    })

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
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      setOdds: (oddsData) => {
          dispatch(setOdds(oddsData))
      }
    };
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
