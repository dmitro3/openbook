import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal";
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer";
import { useState, useEffect} from "react";
import {getOdds} from "@utils/getOdds"
import {CustomSettingsPane} from "@components/Settings/CustomSettingsPane"

// Redux Dependencies
import {connect} from "react-redux"
import {setOdds} from "@actions/oddsActions"

let data = require('@root/odds.json');
let EPL_data = data.Soccer.EPL;

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
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        > 
        <CustomSettingsPane/>

            
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
