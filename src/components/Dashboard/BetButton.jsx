import {Typography, Button} from '@mui/material';
import PropTypes from "prop-types";

export const BetButton = (props) => {
    return(
        <Button
        sx={{
            mr: 1,
            padding: 1.5,
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#d9d9d9'
            },
            '*':{
            pointerEvents: 'none'
            }
            }}
        variant="body2"
        id={props.BetButtonId}
        onClick={(e)=>{props.inSlip ? props.removeBetSlipOutcome(props.BetButtonId) : props.addBetSlipMatch(props.BetButtonId)}}
        style={props.inSlip? {border:'2px solid black'} : { border:'none'}}
        >
        
            <Typography sx={{mr:'auto'}}>{props.number}</Typography>
            <div style={{padding:'0.5vw'}}></div>
            <Typography sx={{ml:'auto',color:'#005a98'}}>{props.outcome}</Typography>
        </Button>
)};

BetButton.propTypes = {
    number:PropTypes.string,
    outcome:PropTypes.string,
    BetButtonId: PropTypes.string,
    inSlip: PropTypes.bool
};