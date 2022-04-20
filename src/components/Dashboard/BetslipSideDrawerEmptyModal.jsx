import Box from '@mui/material/Box';
import PropTypes from "prop-types";
export const BetslipSideDrawerEmptyModal = (props) => {

    return(
        <Box sx={
        props.isSlipOpened ?
        { 
            marginLeft: '365px',
            transition: '0.5s',
            ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                display: 'none'
            }
        }
        :
        {
            marginLeft: '30px',
            transition: '0.5s',
            ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                display: 'none'
            }
        }
        
        }></Box>
    )
}

BetslipSideDrawerEmptyModal.propTypes = {
    setSlipOpen: PropTypes.func,
    isSlipOpened: PropTypes.bool
  };