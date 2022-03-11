import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input'
import {IoTrashBinSharp,IoTicketOutline,IoCashOutline,IoTicket} from 'react-icons/io5'
import {FaRegTimesCircle} from 'react-icons/fa'
import { CgArrowRightR } from "react-icons/cg";
import {Typography} from '@mui/material';
import styles from './BetSlipDrawer.module.css';
import {BetSlipEmpty} from "./BetSlipEmpty"
import {getOdds} from "../../utils/getOdds"

// Redux Dependencies
import {connect} from "react-redux";
import {addBetSlipOutcome,removeBetSlipOutcome, removeAllBetSlipOutcomes, setBetAmount} from '../../actions/betSlipActions';


const BetslipSideDrawer = (props) => {
    const [value, setValue] = React.useState("Single Bet");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const anchor = 'right';

    const [state, setState] = React.useState({
        right: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const isBetSlipEmpty = () =>{
        return props.betSlip.betSlipOutcomeArray.length == 0
    }

    const odds = getOdds();
    console.log(odds);
    
    const list = (anchor) => (
        <Box
            sx={
                props.isSlipOpened ? 
                { 
                    width: '320px',
                    backgroundColor:"white",
                    position:'fixed',
                    height:'auto',
                    borderRadius: '4px',
                    //overflow: 'hidden',
                    right: '20px',
                    top: '128px',
                    transition: '0.5s',
                } :
                { 
                    width: '320px',
                    backgroundColor:"white",
                    position:'fixed',
                    height:'auto',
                    borderRadius: '4px',
                    //overflow: 'hidden',
                    right: '-330px',
                    top: '128px',  
                    transition: '0.5s'  ,
                }
            }
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}

            
        >
        <CgArrowRightR className={`${styles.slipArrow} ${props.isSlipOpened ? styles.slipArrowOpen : styles.slipArrowClosed}`} onClick={()=>(props.setSlipOpen(!props.isSlipOpened))}/>
        
            <Box                 
                sx={{
                    height: '50px',
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white',
                    lineHeight: '50px',
                    verticalAlign: 'middle',
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <IoTicketOutline style={{height:'20px',width:'20px',marginRight:'10px'}}/>
                Bet Slip
            </Box>
            { isBetSlipEmpty() ? <BetSlipEmpty /> : 
            
            <Box sx={{}}>
                <Box sx={{borderBottom:'1px solid #d9d9d9',display:'flex',alignItems: 'center',justifyContent: 'center',textAlign:'center'}}>
                    <Box sx={{width:'50px',height:'100%'}}>
                        <IoTrashBinSharp  className={styles.trashBin} onClick={()=>props.removeAllBetSlipOutcomes ()}/>
                    </Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        TabIndicatorProps={{style: {backgroundColor: "white"}}}
                        
                    >
                        <Tab value="Single Bet"  label="Single Bet" sx={{fontSize:'14px',padding:'0px'}}/>
                        <Tab value="Paylay" label="Parlay" sx={{fontSize:'14px',padding:'0px'}}/>
                        <Tab value="Others" label="Others" sx={{fontSize:'14px',padding:'0px'}}/>
                    </Tabs>
                </Box>
                <Box sx={{maxHeight:"60vh",overflow:'overlay',marginBottom:'10px'}}>
                    <List>
                    {props.betSlip.betSlipOutcomeArray.map((text, index) => {
                        let matchId = text.split('/')[0];
                        let outcomeId = text.split('/')[1];
                        let winningOdds = odds[matchId]['outcomes'][outcomeId];
                        //console.log(odds[matchId]['outcomes']);
                        //console.log(outcomeId);
                        //console.log(text)
                        let possiblePayOut = (Number(winningOdds) * Number(props.betSlip.betAmount)).toFixed(2);
                        return (
                        <Box key={index} 
                        sx={{height:'95px',width:'100%',backgroundColor:'#white',marginBottom:'5px',borderBottom:'1px solid #d9d9d9'}}>
                        <Box sx={{height:'fit-content',backgroundColor:'#white',paddingBottom:'10px',paddingTop:'10px',display:'flex',textAlign:'center'}}>
                            <Box sx={{width:'50px',height:'100%'}}>
                                <FaRegTimesCircle  className={styles.singleTicketDelete} onClick={()=>props.removeBetSlipOutcome(props.betSlip.betSlipOutcomeArray[index])} />
                            </Box>
                            <Box sx={{width:'270px',display:'flex'}}>
                                <Box sx={{backgroundColor:'white',width:'202px',height:'100%'}}>
                                    <Box sx={{display:'flex'}}>
                                        <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'400',marginRight:'5px'}}>Full-time result</Typography>
                                        <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'600'}}>—— DRAW</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'400'}}>{odds[matchId]['match'][0]} vs. {odds[matchId]['match'][1]}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{width:'54px',marginLeft:'7px',marginRight:'7px',height:'100%',textAlign: 'center'}}>
                                <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',display: 'inline-block',verticalAlign: 'middle',lineHeight: 'normal'}}>{winningOdds}</Typography>
                                </Box>

                            </Box>

                        </Box>
                        <Box sx={{height:'fit-content', backgroundColor:'#white',display:'flex',textAlign:'center',paddingTop:'3px',paddingBottom:'3px'}}>
                            <Box sx={{width:'50px',height:'100%'}}>
                                    <IoCashOutline  style={{height:'100%',width:'25px',display:'block',margin:'auto'}}/>
                            </Box>
                            <Box sx={{display:'flex',marginTop:'1px'}}>
                            <Typography sx={{color:'black',textAlign:'left',fontSize:'12px',fontWeight:'400',marginRight:'5px'}}>Possible payout:</Typography>
                                <Box sx={{width:'54px',marginLeft:'7px',marginRight:'7px',height:'100%',textAlign: 'center',display:'flex'}}>
                                    <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',marginTop:'-2px',marginRight:'5px'}}>{possiblePayOut}</Typography>
                                    <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',marginTop:'-2px'}}>DAI</Typography>
                                </Box>
                            </Box>

                        </Box>
                        </Box>
                    )})}
                    </List>
                </Box>

                <Box sx={{width:'304px',height:'44px',textAlign:'center',borderRadius:'5px',marginLeft:'auto',marginRight:'auto',marginBottom:'10px',marginTop:'10px',backgroundColor:'#fffaf6',paddingTop:'8px',paddingBottom:'8px',display:'flex',justifyContent: 'center'}}>
                    <Box sx={{width:'70px',height:'100%',marginRight:'7px',marginLeft:'7px'}}>
                        <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'500',marginRight:'5px',marginTop:'8px'}}>Bet Total:</Typography>
                    </Box>
                    <Box sx={{width:'140px',height:'100%',marginRight:'15px'}}>
                    <Input id="my-input" aria-describedby="my-helper-text" value={props.betSlip.betAmount} inputProps={{min: 0, style: { textAlign: 'center', fontSize:'16px',fontWeight:'700' }}} />
                    </Box>
                    <Box sx={{width:'35px',height:'100%',marginRight:'7px'}}>
                        <Typography sx={{color:'black',textAlign:'left',fontSize:'medium',fontWeight:'700',marginRight:'5px',marginTop:'2px'}}>DAI</Typography>
                    </Box>
                </Box>

                <Box sx={{display:'flex',marginBottom:'30px',marginTop:'15px',justifyContent: 'space-evenly'}}>
                        <Box className={styles.presetBetButton} onClick={()=>props.setBetAmount(100)}>100</Box>
                        <Box className={styles.presetBetButton} onClick={()=>props.setBetAmount(200)}>200</Box>
                        <Box className={styles.presetBetButton} onClick={()=>props.setBetAmount(500)}>500</Box>
                        <Box className={styles.presetBetButton} /*onClick={()=>props.setBetAmount()}*/ disabled>Max</Box>
                </Box>

                <Box className={styles.submitButton}>
                    Connect To MetaMask
                </Box>

            </Box>}
        </Box>  
    );

    return (
        <React.Fragment key={anchor}>
            <div>
                {list(anchor)}
            </div>
            
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        betSlip: state.betSlip
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addBetSlipMatch: (outcomeID) => {
        dispatch(addBetSlipOutcome(outcomeID));
      },
      removeBetSlipOutcome: (outcomeID) => {
        dispatch(removeBetSlipOutcome(outcomeID));
      },
      removeAllBetSlipOutcomes: () => {
          dispatch(removeAllBetSlipOutcomes());
      },
      setBetAmount: (betAmount)=>{
          dispatch(setBetAmount(betAmount))
      }
    };
};
  

BetslipSideDrawer.propTypes = {
    setSlipOpen: PropTypes.func,
    isSlipOpened: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(BetslipSideDrawer);

  
