import Box from '@mui/material/Box';
import PropTypes from "prop-types";
export const BetslipSideDrawerEmptyModal = (props) => {

    return(
        <Box sx={
        props.isSlipOpened ?
        { 
            marginLeft: '350px',
            transition: '0.5s'
        }
        :
        {
            marginLeft: '30px',
            transition: '0.5s'
        }

        }></Box>
    )
}

BetslipSideDrawerEmptyModal.propTypes = {
    setSlipOpen: PropTypes.func,
    isSlipOpened: PropTypes.bool
  };