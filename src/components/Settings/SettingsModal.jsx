import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Typography,TextField,Box,FormControl,Select,MenuItem,FormHelperText,Divider} from "@mui/material";
import {useEffect, useState} from 'react'

export const SettingsModal = (props) => {
    const [oddsFormat, setOddsFormat] = useState(props.oddsFormat);

    const handleChange = (event) => {
        setOddsFormat(event.target.value);
    };

    const [preferUsernameInputQuery, setPreferUsernameInputQuery] = useState(props.preferUsername?props.preferUsername:"");


    const validateInputOnChange = (event) => {
        var t = event.target.value;
        if(t.length > 20){
            return
        }
        else{
            setPreferUsernameInputQuery(event.target.value);
        }
    }

    useEffect(()=>{
        setPreferUsernameInputQuery(props.preferUsername?props.preferUsername:"")
    },[props.preferUsername])

    useEffect(()=>{
        setOddsFormat(props.oddsFormat)
    },[props.open,props.oddsFormat])

    return (
        <Dialog
            fullScreen={props.fullScreen}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
            >
        <DialogTitle id="responsive-dialog-title">
        {"Settings"}
        </DialogTitle>
        <DialogContent>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography>
                {"Prefer Name:"}
            </Typography>
            <TextField id="standard-basic" placeholder="John" variant="standard" value={preferUsernameInputQuery} onChange={event => validateInputOnChange(event)}  />
        </Box>
        <Divider sx={{my:'2rem'}}/>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography>
                {"Odds Format:"}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                id="demo-simple-select-helper"
                value={oddsFormat}
                onChange={handleChange}
                >
                <MenuItem value={'decimal'}>Decimal</MenuItem>
                <MenuItem value={'american'}>American</MenuItem>
                <MenuItem value={'percentage'}>Percentage</MenuItem>
                </Select>
            </FormControl>
        </Box>

        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{props.handleClose()}} autoFocus>
                Cancel
            </Button>
            <Button autoFocus onClick={()=>{props.confirmSettings({preferUsername:preferUsernameInputQuery,oddsFormat:oddsFormat});props.handleClose()}}>
                Confirm
            </Button>
        </DialogActions>
        </Dialog>
    )
}