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
        onClick={(e)=>{e.target.id ? console.log(e.target.id) : void(0)}}>
            <Typography sx={{margin:'auto'}}>{props.number}</Typography>
            <div style={{padding:'0.5vw'}}></div>
            <Typography sx={{margin:'auto',color:'#005a98'}}>{props.outcome}</Typography>
        </Button>
)};

BetButton.propTypes = {
    number:PropTypes.string,
    outcome:PropTypes.string,
    BetButtonId: PropTypes.string
};