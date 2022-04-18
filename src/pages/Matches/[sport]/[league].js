import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal";
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer";
import { useState, useEffect} from "react";
import {useRouter} from 'next/router';
import { SportsBookPageSkeleton } from "@components/Dashboard/SportsBookPageSkeleton";

// Redux Dependencies
import {connect} from "react-redux"
import { setBetSlipOpen } from "@actions/settingsActions";

const Dashboard = (props) => 
{
    const [routerReady,setRouterReady] = useState(false);

    const router = useRouter()
    let data = props.odds.unformattedOddsDict;


    useEffect(()=>{
        if(!router.isReady) return;

        setRouterReady(true)
    }, [router.isReady]);
    
    let league_data = {};
    let league = null;
    let sport = null;

    if(routerReady){
        sport = router.query.sport;
        league = router.query.league;
        league_data = data[sport][league];
    }

    return (
    <>
    <Head>
        <title>{sport} | {league} | Betting | OpenBook</title>
    </Head>
        
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        > 
            {(routerReady && !props.odds.isOddsLoading) ? 
            <>
                <SportsBookPage EPL_data={league_data}/>
                <BetslipSideDrawerEmptyModal setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}  />
                <BetslipSideDrawer setSlipOpen={props.setBetSlipOpen} isSlipOpened={props.settings.isBetSlipOpen}/>
            </>
            :<SportsBookPageSkeleton/>}
            
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
