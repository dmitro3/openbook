import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage"
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState} from "react"

let data = require('../../odds.json');
let EPL_data = data.IceHockey.AHL;

const Dashboard = () => 
{
    const [isSlipOpened, setSlipOpen] = useState(false);
    return (
    <>
    <Head>
        <title>AHL | Betting | OpenEdge</title>
    </Head>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        > 
            <SportsBookPage EPL_data={EPL_data}/>
            <BetslipSideDrawerEmptyModal setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}  />
            <BetslipSideDrawer setSlipOpen={setSlipOpen} isSlipOpened={isSlipOpened}/>
        </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

