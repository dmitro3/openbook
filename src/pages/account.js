import Head from "next/head";
import { Box, Button, Tab, Tabs, Typography, Grid } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import {useState} from "react"

import {Overview} from "@components/Account/Overview";
import {Unsettled} from "@components/Account/Unsettled";
import {Settled} from "@components/Account/Settled";

const Account = (props) => 
{  
    const [tabState, setTabState] = useState("overview");



    const handleChange = (event, newValue) => {
        setTabState(newValue);
      };

    return (
            <Box sx={{py:'25px',px:'50px',width:'95%',minHeight:'1000px'}}>
                <Box sx={{ width: '100%', backgroundColor: 'var(--background-default)',py:"20px"  }}>
                    <Tabs value={tabState} onChange={(event,newValue)=>handleChange(event,newValue)} centered variant="fullWidth">
                    <Tab value="overview" label="Overview" />
                    <Tab value="unsettled" label="Unsettled Bets" />
                    <Tab value="settled" label="Settled Bets" />
                    </Tabs>
                </Box>

                {tabState == "overview" ? <Overview/>  : void(0)}
                {tabState == "unsettled" ? <Unsettled/> : void(0)}
                {tabState == "settled" ? <Settled/> : void(0)}
            </Box>
    )
}

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Account;