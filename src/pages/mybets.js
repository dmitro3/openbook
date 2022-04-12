import Head from "next/head";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import styles from '@styles/mybets.module.css';
import {useState,useEffect} from "react"
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {theme} from '@styles/theme';

const columns = [
    {
        name: "result",
        label: "Result",
        options: {
         filter: true,
         sort: true,
        }
       },
    {
     name: "settled_time",
     label: "Settled Time",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "game_time",
     label: "Game Time",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "league",
     label: "League",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "game",
     label: "Game",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
        name: "bet",
        label: "Bet",
        options: {
            filter: false,
            sort: true,
        }
     },
     {
        name: "stake",
        label: "Stake",
        options: {
            filter: true,
            sort: true,
        }
     },
     {
        name: "odds",
        label: "Odds",
        options: {
            filter: false,
            sort: true,
        }
     },
     {
        name: "return",
        label: "Return",
        options: {
            filter: false,
            sort: true,
        }
     },
     {
        name: "claim_rewrd",
        label: "claim reward",
        options: {
            filter: false,
            sort: true,
        }
     },
     

];

const data = [
    { result: <p style={{fontSize:'24px'}}>😊</p>,settled_time: "Mar 15, 2022", game_time: "Mar 15, 2022", league: "NBA", game: "Orlando Magic vs Brooklyn Nets",bet:"Orlando Magic",stake:"100",odds:"1.25",return:"$125",claim_rewrd:<Button  variant="contained">🏆 Claim Reward</Button>},
    { result: <p style={{fontSize:'24px'}}>😊</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"$650",claim_rewrd:<Button  variant="contained">🏆 Claim Reward</Button>  },
    { result: <p style={{fontSize:'24px'}}>😰</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Sacramento Kings vs Milwaukee Bucks",bet:"Sacramento Kings",stake:"100",odds:"3.96",return:"pending" },
    { result: <p style={{fontSize:'24px'}}>😞</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"$0" },
    { result: <p style={{fontSize:'24px'}}>😊</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"$650",claim_rewrd:"✔️Reward Claimed" },
    { result: <p style={{fontSize:'24px'}}>😞</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"$0" },
    { result: <p style={{fontSize:'24px'}}>😞</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"$0" },
    { result: <p style={{fontSize:'24px'}}>😊</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"$650",claim_rewrd:"✔️Reward Claimed" },
    { result: <p style={{fontSize:'24px'}}>😰</p>,settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Sacramento Kings vs Milwaukee Bucks",bet:"Sacramento Kings",stake:"100",odds:"3.96",return:"pending" },
];

const options = {
    filterType: 'checkbox',
    pagination: false,
    selectableRows: 'none',
    setRowProps: row => { 
        if (row[0].props.children == "😊") {
          return {
            style: { background: "rgb(89 243 80 / 20%)"}
          };
        }
        else if(row[0].props.children == "😰")
        {
            return{
                style: { background: "snow" }
            }
        }
        else if(row[0].props.children == "😞")
        {
            return{
                style: { background: "rgb(243 80 95 / 20%)" }
            }
        }
    }
};
  



const Dashboard = (props) => 
{  
    const [tabState, setTabState] = useState(0);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
      };

    const getMuiTheme = () => createTheme({
        components: {
            MuiTableRow: {
            styleOverrides:{
              root: { '&:hover': { backgroundColor: '#dbdfe570 !important' }, }
            }
          }
        },
      })
    return (
            <Box sx={{py:'50px',px:'50px',width:'95%'}}>
                <Box sx={{py:'20px'}}>
                    <Typography sx={{color:'black', fontSize:'24px',fontWeight:'500'}}>Account</Typography>
                </Box>
                <Box sx={{ width: '100%', backgroundColor: 'var(--background-default)',py:"20px"  }}>
                    <Tabs value={tabState} onChange={handleChange} centered variant="fullWidth">
                    <Tab label="Overview" />
                    <Tab label="Unsettled Bets" />
                    <Tab label="Settled Bets" />
                    </Tabs>
                </Box>
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Unsettled Bets"}
                        data={data}
                        columns={columns}
                        options={options}                      
                    />    
                </ThemeProvider>


            </Box>
    )
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Dashboard;