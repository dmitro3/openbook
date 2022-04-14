import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography,Box} from "@mui/material";
import MUIDataTable from "mui-datatables";

const columns = [
    {
     name: "bet_time",
     label: "Bet Time",
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
        name: "possible_return",
        label: "Possible Return($)",
        options: {
            filter: false,
            sort: true,
        },
     },

];

const data = [
    {bet_time: "Mar 15, 2022", game_time: "Mar 15, 2022", game: "Orlando Magic vs Brooklyn Nets",bet:"Orlando Magic",stake:"100",odds:"1.25",possible_return:"125"},
    {bet_time: "Mar 17, 2022", game_time: "Mar 17, 2022", game: "Utah Jazz vs Chicago Bulls",bet:"Utah Jazz",stake:"200",odds:"3.25",possible_return:"650"},
    {bet_time: "Mar 17, 2022", game_time: "Mar 17, 2022", game: "Golden State Warriors vs Boston Celtics",bet:"Golden State Warriors",stake:"500",odds:"1.74",possible_return:"870"},
];

const options = {
    filterType: 'checkbox',
    pagination: false,
    selectableRows: 'none',
    viewColumns: false,
    search: false,
    print: false,
    download: false,
    filter: false
};

const getTotalBet = () =>{
    let sum = 0
    data.map((item,index)=>{
        return sum+= Number(item.stake);
    })
    return sum.toFixed(2);
}

const getTotalPossibleReturn = () =>{
    let sum = 0
    data.map((item,index)=>{
        return sum+= Number(item.possible_return);
    })
    return sum.toFixed(2);
}

export const BetConfirmPopup = (props) => {
    return (
        <Dialog
            fullScreen={props.fullScreen}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth={true}
            maxWidth={"lg"}
            >
                <DialogContent>
                    <MUIDataTable
                    title={"Bet Receipts"}
                    data={data}
                    columns={columns}
                    options={options}                      
                    />  
                    <Box sx={{display:'flex',mt:'20px',justifyContent: 'center'}}>
                        <Box sx={{display:'flex',mr:'20px'}}>
                            <Typography sx={{fontSize:'25px',fontWeight:'400',mr:'15px'}}>Total Bet: </Typography><Typography  sx={{fontSize:'25px',fontWeight:'500'}}>{`$${getTotalBet()}`}</Typography>
                        </Box>  

                        <Box sx={{display:'flex',ml:'20px'}}>
                            <Typography sx={{fontSize:'25px',fontWeight:'400',mr:'15px'}}>Total Possible Return: </Typography><Typography  sx={{fontSize:'25px',fontWeight:'500'}}>{`$${getTotalPossibleReturn()}`}</Typography>
                        </Box>  
                        
                    </Box>  
                    </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
        </Dialog>
    )
}

