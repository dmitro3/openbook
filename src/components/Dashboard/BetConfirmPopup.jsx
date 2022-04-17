import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography,Box} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useMemo, useState,useEffect } from "react";

const columns = [
    // {
    //  name: "bet_time",
    //  label: "Bet Time",
    //  options: {
    //   filter: false,
    //   sort: true,
    //  }
    // },
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
        label: "Stake (DAI)",
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
        label: "Possible Return (DAI)",
        options: {
            filter: false,
            sort: true,
        },
     },

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

export const BetConfirmPopup = (props) => {
    let data = props.orderReceiptArr;
    let totalBet = props.totalBet;
    let totalPossiblePayout = props.totalPossiblePayout;
    let betTime = props.betTime;
    data.map((item)=>{
        item.bet_time = new Date(betTime).toLocaleString();
        item.game_time = new Date(item.game_time).toLocaleString();
        
    })

    let renderComponent = (
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
                            <Typography sx={{fontSize:'25px',fontWeight:'400',mr:'15px'}}>Total Bet: </Typography><Typography  sx={{fontSize:'25px',fontWeight:'500'}}>{`${totalBet} DAI`}</Typography>
                        </Box>  

                        <Box sx={{display:'flex',ml:'20px'}}>
                            <Typography sx={{fontSize:'25px',fontWeight:'400',mr:'15px'}}>Total Possible Return: </Typography><Typography  sx={{fontSize:'25px',fontWeight:'500'}}>{`${totalPossiblePayout} DAI`}</Typography>
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

    return renderComponent;
}

