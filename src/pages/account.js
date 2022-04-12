import Head from "next/head";
import { Box, Button, Tab, Tabs, Typography, Grid } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import styles from '@styles/mybets.module.css';
import {useState,useEffect} from "react"
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {theme} from '@styles/theme';
import { AccountOverviewChart } from "@components/Account/AccountOverviewChart";
import { AccountOverviewList } from "@components/Account/AccountOverviewList";

import {AccountCard} from "@components/Account/AccountCard";

import {Unsettled} from "@components/Account/Unsettled";
import {Settled} from "@components/Account/Settled";

  
const card1style = {
    card_bg_color: "rgb(94, 53, 177)",
    card_second_color: "rgb(69, 39, 160)",
    card_title: "Total Winning",
    card_number: "$1800.00" ,
    card_icon: "/static/images/account/gold_coin.png",
}

const card2style = {
    card_bg_color: "rgb(30, 136, 229)",
    card_second_color: "rgb(21, 101, 192)",
    card_title: "Win Ratio",
    card_number: "57%" ,
    card_icon: "https://cdn-icons-png.flaticon.com/512/1170/1170611.png",
}

const card3style = {
    card_bg_color: "rgb(255, 172, 62)",
    card_second_color: "rgb(255, 152, 0)",
    card_title: "Rank",
    card_number: "#1" ,
    card_icon: "https://cdn-icons-png.flaticon.com/512/3629/3629625.png",
}

const card4style = {
    card_bg_color: "rgb(139, 195, 74)",
    card_second_color: "rgb(76, 175, 80)",
    card_title: "Current Winning Streak",
    card_number: "3" ,
    card_icon: "https://cdn-icons-png.flaticon.com/512/394/394631.png",
}



const Dashboard = (props) => 
{  
    const [tabState, setTabState] = useState("overview");


    const handleChange = (event, newValue) => {
        setTabState(newValue);
      };

    let gridSpacing = 3;


    


    return (
            <Box sx={{py:'25px',px:'50px',width:'95%',minHeight:'1000px'}}>
                <Box sx={{ width: '100%', backgroundColor: 'var(--background-default)',py:"20px"  }}>
                    <Tabs value={tabState} onChange={handleChange} centered variant="fullWidth">
                    <Tab value="overview" label="Overview" />
                    <Tab value="unsettled" label="Unsettled Bets" />
                    <Tab value="settled" label="Settled Bets" />
                    </Tabs>
                </Box>

                {tabState == "overview" ?  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <AccountCard card_style={card1style}/>
                            </Grid>
                            <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <AccountCard card_style={card2style}/>
                            </Grid>
                            <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <AccountCard card_style={card3style}/>
                            </Grid>
                            <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <AccountCard card_style={card4style}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                                <AccountOverviewChart/>
                            </Grid>
                            <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                                <AccountOverviewList/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> : void(0)}

               




                {tabState == "unsettled" ? <Unsettled/> : void(0)}
                {tabState == "settled" ? <Settled/> : void(0)}


            </Box>
    )
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Dashboard;