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
                cursor: 'pointer',
                backgroundColor: '#d9d9d9'
        }}}
        variant="body2"
        id={props.BetButtonId}
        onClick={(e)=>{e.target.id ? console.log(e.target.id) : reutrn}}>
            <Typography sx={{margin:'auto',pointerEvents: 'none'}}>{props.number}</Typography>
            <div style={{padding:'10px',pointerEvents: 'none'}}></div>
            <Typography sx={{margin:'auto',color:'#005a98',pointerEvents: 'none'}}>{props.outcome}</Typography>
        </Button>
)};

BetButton.propTypes = {
    number:PropTypes.string,
    outcome:PropTypes.string,
    BetButtonId: PropTypes.string
};