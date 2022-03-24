import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal";
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer";
import { useState, useEffect} from "react";
import {getOdds} from "@utils/getOdds"
import {useRouter} from 'next/router';

// Redux Dependencies
import {connect} from "react-redux"
import {setOdds} from "@actions/oddsActions"



const Dashboard = (props) => 
{
    const [routerReady,setRouterReady] = useState(false);
    const [isSlipOpened, setSlipOpen] = useState(false);

    const router = useRouter()
    let data = require('@root/odds.json');

    useEffect(()=>{
        const oddsData = getOdds();
        props.setOdds(oddsData);
    })

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
        <title>{sport} | {league} | Betting | OpenEdge</title>
    </Head>
        {routerReady ? 
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        > 
            <SportsBookPage EPL_data={league_data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />
            <BetslipSideDrawer setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}/>
            
        </Box>:<h1>Loading</h1>}
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
