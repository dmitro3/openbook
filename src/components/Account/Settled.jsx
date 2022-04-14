import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MUIDataTable from "mui-datatables";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";

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
            filter: true,
            sort: true,
        }
     },
     {
        name: "stake",
        label: "Stake($)",
        options: {
            filter: true,
            sort: true,
        },
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
        label: "Return($)",
        options: {
            filter: false,
            sort: true,
        },
     },
    //  {
    //     name: "claim_reward",
    //     label: "claim reward",
    //     options: {
    //         filter: false,
    //         sort: false,
    //     }
    //  },
     

];

const data = [
    { result: "😊",settled_time: "Mar 15, 2022", game_time: "Mar 15, 2022", league: "NBA", game: "Orlando Magic vs Brooklyn Nets",bet:"Orlando Magic",stake:"100",odds:"1.25",return:"125",claim_reward:"✔️ Reward Claimed" },
    { result: "😊",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"650",claim_reward:"✔️ Reward Claimed" },
    { result: "😞",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"0" },
    { result: "😊",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"650",claim_reward:"✔️ Reward Claimed" },
    { result: "😞",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"0" },
    { result: "😞",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",return:"0" },
    { result: "😊",settled_time: "Mar 17, 2022", game_time: "Mar 17, 2022", league: "NBA", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",return:"650",claim_reward:"✔️ Reward Claimed" },
];

const options = {
    filterType: 'checkbox',
    pagination: false,
    selectableRows: 'none',
    viewColumns: false,
    setRowProps: row => { 
        if (row[0] == "😊") {
          return {
            style: { background: "rgb(89 243 80 / 20%)"}
          };
        }
        else if(row[0] == "😞")
        {
            return{
                style: { background: "rgb(243 80 95 / 20%)" }
            }
        }
    },
};

export const Settled = (props) =>{
    
    const getMuiTheme = () => createTheme({
        components: {
            MuiTableRow: {
            styleOverrides:{
              root: { '&:hover': { backgroundColor: '#78afff36 !important' }, '&>td:first-of-type': {fontSize:'24px'} }
            }
          }
        },
        palette: {
            primary: {
                main: "#5048E5"
            }
        }

      })

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={"Settled Bets"}
                data={data}
                columns={columns}
                options={options}                      
            />    
        </ThemeProvider>
    )
} 