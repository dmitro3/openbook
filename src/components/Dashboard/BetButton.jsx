import { Box, Typography, Button} from '@mui/material';
import PropTypes from "prop-types";

export const BetButton = (props) => {

    return(
        <Box
            sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
            }}
        >
        <Button
        sx={{
            mr: 1,
            padding: 1.5,
            backgroundColor: '#f5f5f5'
        }}
        variant="body2"
        onMouseEnter={(e)=>{e.target.style.backgroundColor = "#d9d9d9"}}
        onMouseLeave={(e)=>{e.target.style.backgroundColor = "#f5f5f5"}}
        
        >
            <Typography sx={{margin:'auto'}}>{props.number}</Typography>
            <div style={{padding:'10px'}}></div>
            <Typography sx={{margin:'auto',color:'#005a98'}}>{props.outcome}</Typography>
        </Button>

        </Box>
)};

BetButton.propTypes = {
    number:PropTypes.string,
    outcome:PropTypes.string,
};