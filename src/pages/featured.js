import Head from "next/head";
import { Box, Typography } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage"
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState} from "react"
import CustomSwiper from "@components/Dashboard/CustomSwiper";
import CustomSwiperForFeatureRows from "@components/Dashboard/CustomSwiperForFeatureRows";
import { FeaturedSportPage } from "@components/Dashboard/FeaturedSportPage";

let data = require('../../odds.json');
let EPL_data = data.Soccer.EPL;

const Dashboard = () => 
{
    const [isSlipOpened, setSlipOpen] = useState(false);
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
        {/*<CustomSwiper/>*/}
        <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />        
        </Box>

        <Box
            sx={{
            py: 8,
            display: 'flex'
            }}>

            <FeaturedSportPage/>
            <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />
        </Box>
        <BetslipSideDrawer setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}/>
        </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
