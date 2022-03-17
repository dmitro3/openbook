import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import { SportsBookPage } from "@components/Dashboard/SportsBookPage"
import { BetslipSideDrawerEmptyModal } from "@components/Dashboard/BetslipSideDrawerEmptyModal"
import  BetslipSideDrawer from "@components/Dashboard/BetslipSideDrawer"
import { useState} from "react"



const Dashboard = () => 
{
    const [isSlipOpened, setSlipOpen] = useState(false);
    return (
    <>
    <Head>
        <title>AHL | Betting | OpenEdge</title>
    </Head>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

