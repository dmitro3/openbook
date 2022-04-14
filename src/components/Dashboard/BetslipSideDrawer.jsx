import PropTypes from "prop-types";
import {IoTrashBinSharp,IoTicketOutline,IoCashOutline,IoTicket} from 'react-icons/io5';
import {FaRegTimesCircle} from 'react-icons/fa';
import { CgArrowRightR } from "react-icons/cg";
import styles from '@styles/BetSlipDrawer.module.css';
import {BetSlipEmpty} from "@components/Dashboard/BetSlipEmpty";
import {useState,useEffect, Fragment} from 'react';
import {DeleteAllMatchesInBetSlipModal} from "@components/Dashboard/DeleteAllMatchesInBetSlipModal"
import {Box,List,Tabs,Tab,Input,Typography,useMediaQuery, Button} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {ConnectButton} from "@components/Dashboard/ConnectButton";
import {connectMetaMask} from "@utils/web3Provider";
import { InstallMetaMaskButton } from "@components/Dashboard/InstallMetaMaskButton";
import {makeBet} from "@utils/web3Provider";
import {BetConfirmPopup} from "@components/Dashboard/BetConfirmPopup";

// Redux Dependencies
import {connect} from "react-redux";
import {addBetSlipOutcome,removeBetSlipOutcome, removeAllBetSlipOutcomes, setBetAmount} from '@actions/betSlipActions';
import {setDisconnected} from "@actions/settingsActions"


const BetslipSideDrawer = (props) => {
    /* Delete all matches in slip confirm modal properties */
    const [delteAllModalOpen, setdelteAllModalOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleClickOpen = () => {
        setdelteAllModalOpen(true);
      };

      const handleClose = () => {
        setdelteAllModalOpen(false);
      };  

    // Confirm bets modal properties
    const [confirmBetModalOpen, setConfirmBetModalOpen] = useState(true);
    
    const handleconfirmBetModalOpen = () => {
        setConfirmBetModalOpen(true);
      };

    const handleconfirmBetModalClose = () => {
        setConfirmBetModalOpen(false);
    };     



    // Slip tabs for different betting schemes properties */
    const [tabsValue, setTabsValue] = useState("Single Bet");

    const handleChange = (event, newValue) => {
        setTabsValue(newValue);
      };

    // Opening Slip Properties
    const anchor = 'right';

    const [slipState, setSlipState] = useState({
        right: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        setSlipState({ ...slipState, [anchor]: open });
    };

    // Bet/match input properties, the input is captured every 0.2 second
    const [betInputQuery, setBetInputQuery] = useState("30.00");

    const validateInputOnKeyPress = (event) => {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 
          && (charCode < 48 || charCode > 57))
           event.preventDefault();
    }

    const validateInputOnChange = (event) => {
        var t = event.target.value;
        event.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
        if(Number.isNaN(Number(event.target.value))){
            event.target.value = "";
        }
        setBetInputQuery(event.target.value);
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => props.setBetAmount(betInputQuery), 200);
        return () => clearTimeout(timeOutId);
      }, [betInputQuery]);

    // Helper function for checking betSlipOutcomeArray is empty or not
    const isBetSlipEmpty = () =>{
        return props.betSlip.betSlipOutcomeArray.length == 0
    }

    //Helper function for setting max bet
    const setMaxBet = () => {
        let gamesInBetSlip = props.betSlip.betSlipOutcomeArray;
        if(gamesInBetSlip.length == 0)
            return;
        let balance = props.user.balance;
        let betEachGame = (Number(balance) / Number(gamesInBetSlip.length)).toFixed(2);
        setBetInputQuery(betEachGame)
    }

    const placeBet = async () =>{
        let betResult = await makeBet(3, 1, (Object.keys(props.betSlip.betSlipOutcomeArray).length * Number(betInputQuery)).toFixed(2));    
        console.log("bet placed, result ", betResult)
        setConfirmBetModalOpen(betResult);
    }

    let totalPossiblePayoutDict = {}

    const list = (anchor) => (
        <Box
            className={`${styles.slip} ${props.isSlipOpened ? styles.slipOpen : styles.slipClose}`}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        <CgArrowRightR className={`${styles.slipArrow} ${props.isSlipOpened ? styles.slipArrowOpen : styles.slipArrowClosed}`} onClick={()=>(props.setSlipOpen(!props.isSlipOpened))}/>
        
            <Box className={styles.slipTopIconBlackBox}>
                <IoTicketOutline className={styles.ticketIcon}/>
                Bet Slip
            </Box>
            { isBetSlipEmpty() ? <BetSlipEmpty /> : 
            
            <Box>
                <Box className={styles.slipTabsOutterBox}>
                    <Box className={styles.slipTabsTrashBinBox}>
                        <IoTrashBinSharp  className={styles.trashBin} onClick={handleClickOpen}/>
                        <DeleteAllMatchesInBetSlipModal fullScreen={fullScreen} open={delteAllModalOpen} handleClose={handleClose} removeAllBetSlipOutcomes={props.removeAllBetSlipOutcomes}/>
                    </Box>
                    <Tabs
                        value={tabsValue}
                        onChange={handleChange}
                        TabIndicatorProps={{style: {backgroundColor: "white"}}}
                        
                    >
                        <Tab key={1} value="Single Bet"  label="Single Bet" sx={{fontSize:'14px',padding:'0px'}}/>
                        <Tab disabled={true} key={2} value="Paylay" label="Parlay" sx={{fontSize:'14px',padding:'0px'}}/>
                        <Tab disabled={true} key={3} value="Others" label="Others" sx={{fontSize:'14px',padding:'0px'}}/>
                    </Tabs>
                </Box>
                <Box className={styles.boxBeforeBetSlipSelectedMatchBox}/>
                <Box className={styles.betSlipSelectedMatchBox}>
                    <List sx={{paddingBottom:'0px'}}>
                    {props.betSlip.betSlipOutcomeArray.map((text, index) => {
                        let matchId = text.split('/')[0];
                        let outcomeId = text.split('/')[1];
                        let winningOdds = props.odds.oddsDict[matchId]['outcomes'][outcomeId];
                        //console.log(props.odds.oddsDict[matchId]['outcomes']);
                        //console.log(outcomeId);
                        //console.log(props.odds.oddsDict);
                        let displayOutcome = "";
                        switch (outcomeId){
                            case '1':
                                displayOutcome = props.odds.oddsDict[matchId]['match'][0];
                            break;
                            case 'X':
                                displayOutcome = "DRAW";
                            break;
                            case '2':
                                displayOutcome = props.odds.oddsDict[matchId]['match'][1];
                            break;
                        }

                        let possiblePayOut = (Number(winningOdds) * Number(props.betSlip.betAmount)).toFixed(2);
                        totalPossiblePayoutDict = {...totalPossiblePayoutDict,[matchId]:possiblePayOut};
                        return (
                        <Box key={index} 
                            sx={{height:'auto',width:'100%',backgroundColor:'white',borderBottom:'1px solid #d9d9d9',paddingTop:'5px',paddingBottom:'5px'}}>
                            <Box sx={{height:'fit-content',backgroundColor:'white',paddingBottom:'10px',paddingTop:'10px',display:'flex',textAlign:'center'}}>
                                <Box sx={{width:'50px',height:'100%'}}>
                                    <FaRegTimesCircle  className={styles.singleTicketDelete} onClick={()=>props.removeBetSlipOutcome(props.betSlip.betSlipOutcomeArray[index])} />
                                </Box>
                                <Box sx={{width:'270px',display:'flex'}}>
                                    <Box sx={{backgroundColor:'white',width:'202px',height:'100%'}}>
                                        <Box sx={{display:'flex'}}>
                                            <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'400',width:'50%'}}>Full-time result: </Typography>
                                            <Typography sx={{color:'black',textAlign:'center',fontSize:'13px',fontWeight:'600',width:'50%'}}>{displayOutcome}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'400'}}>{props.odds.oddsDict[matchId]['match'][0]} vs. {props.odds.oddsDict[matchId]['match'][1]}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{width:'54px',marginLeft:'0px',marginRight:'20px',height:'100%',textAlign: 'center'}}>
                                    <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',display: 'inline-block',verticalAlign: 'middle',lineHeight: 'normal'}}>{winningOdds}</Typography>
                                    </Box>

                                </Box>

                            </Box>
                            <Box sx={{height:'fit-content', backgroundColor:'white',display:'flex',textAlign:'center',paddingTop:'3px',paddingBottom:'3px'}}>
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

                <Box sx={{width:'304px',height:'44px',textAlign:'center',borderRadius:'5px',marginLeft:'auto',marginRight:'auto',marginBottom:'10px',backgroundColor:'#f1f1f1',display:'flex',justifyContent: 'center', marginTop: '25px', marginBottom: '20px'}}>
                    <Box sx={{width:'70px',height:'100%',marginRight:'7px',marginLeft:'7px'}}>
                        <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'500',marginRight:'5px',marginTop:'8px'}}>Bet/Match:</Typography>
                    </Box>
                    <Box sx={{width:'120px',height:'100%',marginRight:'15px'}}>
                    <Input id="totalBetInput" 
                    aria-describedby="my-helper-text" 
                    value={betInputQuery} placeholder="30.00"  
                    onChange={event => validateInputOnChange(event)} 
                    inputProps={{min: 0, style: { textAlign: 'center', fontSize:'16px',fontWeight:'700' }}} 
                    onKeyPress={(event) => validateInputOnKeyPress(event)}
                    />
                    </Box>
                    <Box sx={{width:'35px',height:'100%',marginRight:'7px'}}>
                        <Typography sx={{color:'black',textAlign:'left',fontSize:'medium',fontWeight:'700',marginRight:'5px',marginTop:'2px'}}>DAI</Typography>
                    </Box>
                </Box>

                <Box className={styles.betSlipButtonsBox}>

                {[100,200,300].map((value,index)=>{
                    return(
                        <Box className={styles.presetBetButton} key={index} onClick={()=>{props.setBetAmount(value);setBetInputQuery(value)}}>{value}</Box>
                    )
                })}

                        <Box className={styles.presetBetButton} onClick={()=>setMaxBet()} disabled>Max</Box>
                </Box>

                <Box className={styles.boxBeforeBetSlipSelectedMatchBox}/>
                <Box sx={{display:'flex'}}>
                    <Box sx={{"paddingRight":"0.8rem","borderRight":"1px solid #efefef","display":"block","marginLeft":"7%","paddingTop":"10px","marginBottom":"10px","textAlign":"left"}}>
                        <Typography sx={{whiteSpace: 'pre-wrap'}}>Bet Total</Typography>
                        <Typography sx={{"color":"#e57714","margin":"0","fontSize":"1.35rem"}}>{(Object.keys(props.betSlip.betSlipOutcomeArray).length * Number(betInputQuery)).toFixed(2)} DAI</Typography>
                    </Box>

                    <Box sx={{"display":"block","paddingTop":"10px","paddingLeft":"1rem","textAlign":"left"}}>
                        <Typography sx={{whiteSpace: 'pre-wrap'}}>Possible Winnings</Typography>
                        <Typography sx={{"color":"#52b49c","margin":"0","fontSize":"1.35rem"}}>{Object.values(totalPossiblePayoutDict).reduce((accumulator,item)=>{return Number(accumulator) + Number(item)},0).toFixed(2)} DAI</Typography>
                    </Box>
                </Box>

                {
                    !props.user.hasProvider ?
                    <InstallMetaMaskButton style={{width:'100%',marginLeft:'0px',marginRight:'0px',paddingTop:'0.5rem',paddingBottom:'0.5rem',fontSize:'20px'}}/> :
                    props.user.loggedIn ?
                    <button className={styles.submitButton} onClick={()=>placeBet()}>
                        <Typography sx={{fontSize:'25px',fontWeight:'600'}}>Place a Bet</Typography>
                    </button> :
                    <ConnectButton style={{width:'100%',marginLeft:'0px',marginRight:'0px',paddingTop:'0.5rem',paddingBottom:'0.5rem',fontSize:'20px'}} setDisconnected={props.setDisconnected} connectMetaMask={connectMetaMask}/>
                }

                <BetConfirmPopup fullScreen={fullScreen} open={confirmBetModalOpen} handleClose={handleconfirmBetModalClose}/>
                

            </Box>}
        </Box>  
    );

    return (
        <Fragment key={anchor}>
                {list(anchor)}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        betSlip: state.betSlip,
        odds: state.odds,
        user: state.user
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
      },
      setDisconnected: (disconnected) => {
        dispatch(setDisconnected(disconnected))
      }
    };
};
  

BetslipSideDrawer.propTypes = {
    setSlipOpen: PropTypes.func,
    isSlipOpened: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(BetslipSideDrawer);

  
