import Head from "next/head";
import { Box} from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState} from "react"
import { FeaturedSportPage } from "@components/Dashboard/FeaturedSportPage";
import {CustomSwiper} from "@components/Dashboard/CustomSwiper" 

let data = require('@root/odds.json');
console.log(data);

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

        <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />        
        </Box>

        <Box
            sx={{
            py: 8,
            display: 'flex'
            }}>

            <FeaturedSportPage isSlipOpened={isSlipOpened} data={data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />
        </Box>
        <BetslipSideDrawer setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}/>
        </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
