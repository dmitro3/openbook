import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "../components/DashboardLayout";
import { SportsBookPage } from "../components/Dashboard/SportsBookPage"
import { BetslipSideDrawerEmptyModal } from "../components/Dashboard/BetslipSideDrawerEmptyModal"
import { BetslipSideDrawer} from "../components/Dashboard/BetslipSideDrawer"



let data = require('../../odds.json');
let EPL_data = data.Soccer.EPL;

const Dashboard = () => 
{
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
            <SportsBookPage EPL_data={EPL_data}/>
            <BetslipSideDrawerEmptyModal />
            <BetslipSideDrawer />
        </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
