import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal";
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer";
import { useState, useEffect} from "react";

// Redux Dependencies
import {connect} from "react-redux"
import { setBetSlipOpen } from "@actions/settingsActions";

const Dashboard = (props) => 
{
    let data = props.odds.unformattedOddsDict.Basketball.NBA;
    
    return (
    <>
    <Head>
        <title>Home | OpenEdge</title>
    </Head>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        > 
            <SportsBookPage EPL_data={data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />
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
