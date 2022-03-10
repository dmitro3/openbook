import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input'
import {IoTrashBinSharp,IoTicketOutline,IoCashOutline} from 'react-icons/io5'
import {FaRegTimesCircle} from 'react-icons/fa'
import { CgArrowRightR } from "react-icons/cg";
import {Typography} from '@mui/material';



export const BetslipSideDrawer = (props) => {
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
    
    const list = (anchor) => (
        <Box
            sx={
                props.isSlipOpened ? 
                { 
                    width: '320px',
                    backgroundColor:"white",
                    position:'fixed',
                    height:'fit-content',
                    borderRadius: '4px',
                    //overflow: 'hidden',
                    right: '20px',
                    top: '128px',
                    transition: '0.5s'
                } :
                { 
                    width: '320px',
                    backgroundColor:"white",
                    position:'fixed',
                    height:'fit-content',
                    borderRadius: '4px',
                    //overflow: 'hidden',
                    right: '-330px',
                    top: '128px',  
                    transition: '0.5s'     
                }
            }
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}

            
        >
        <CgArrowRightR 
            style=
            {
                props.isSlipOpened ? 
                {position:'absolute',top:'2.5%',left:'12.5px',width:'25px',height:'25px',zIndex:'1',color:'white',cursor:'pointer'} :
                {position:'absolute',top:'2.5%',left:'-40px',width:'25px',height:'25px',zIndex:'1',color:'black',cursor:'pointer',transform: 'scaleX(-1)', transition: '0.5s'}
            }
            onClick={()=>(props.setSlipOpen(!props.isSlipOpened))}
        />
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
            <Box sx={{borderBottom:'1px solid #d9d9d9',display:'flex',alignItems: 'center',justifyContent: 'center',textAlign:'center'}}>
                <Box sx={{width:'50px',height:'100%'}}>
                    <IoTrashBinSharp  style={{height:'25px',width:'25px', cursor:'pointer',display:'block',margin:'auto',}}/>
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
                {[1,2].map((text, index) => (
                    <Box key={index} 
                    sx={{height:'95px',width:'100%',backgroundColor:'#white',marginBottom:'5px',borderBottom:'1px solid #d9d9d9'}}>
                    <Box sx={{height:'fit-content',backgroundColor:'#white',paddingBottom:'10px',paddingTop:'10px',display:'flex',textAlign:'center'}}>
                        <Box sx={{width:'50px',height:'100%'}}>
                            <FaRegTimesCircle  style={{height:'100%',width:'25px', cursor:'pointer',display:'block',margin:'auto'}}/>
                        </Box>
                        <Box sx={{width:'270px',display:'flex'}}>
                            <Box sx={{backgroundColor:'white',width:'202px',height:'100%'}}>
                                <Box sx={{display:'flex'}}>
                                    <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'400',marginRight:'5px'}}>Full-time result</Typography>
                                    <Typography sx={{color:'black',textAlign:'left',fontSize:'13px',fontWeight:'400'}}>—— AS DRAW</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'400'}}>Manchester City vs. Manchester United</Typography>
                                </Box>
                            </Box>
                            <Box sx={{width:'54px',marginLeft:'7px',marginRight:'7px',height:'100%',textAlign: 'center'}}>
                            <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',display: 'inline-block',verticalAlign: 'middle',lineHeight: 'normal'}}>6.00</Typography>
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
                                <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',marginTop:'-2px',marginRight:'5px'}}>600.00</Typography>
                                <Typography sx={{color:'black',textAlign:'left',fontSize:'15px',fontWeight:'700',textAlign:'center',marginTop:'-2px'}}>DAO</Typography>
                            </Box>
                        </Box>

                    </Box>
                    </Box>
                ))}
                </List>
            </Box>

            <Box sx={{width:'304px',height:'44px',textAlign:'center',borderRadius:'5px',marginLeft:'auto',marginRight:'auto',marginBottom:'10px',marginTop:'10px',backgroundColor:'#fffaf6',paddingTop:'8px',paddingBottom:'8px',display:'flex',justifyContent: 'center'}}>
                <Box sx={{width:'70px',height:'100%',marginRight:'7px',marginLeft:'7px'}}>
                    <Typography sx={{color:'#555',textAlign:'left',fontSize:'12px',fontWeight:'400',marginRight:'5px',marginTop:'6px'}}>Bet Total:</Typography>
                </Box>
                <Box sx={{width:'140px',height:'100%',marginRight:'15px'}}>
                <Input id="my-input" aria-describedby="my-helper-text" placeholder='0.00' inputProps={{min: 0, style: { textAlign: 'center', fontSize:'16px',fontWeight:'700' }}} />
                </Box>
                <Box sx={{width:'35px',height:'100%',marginRight:'7px'}}>
                    <Typography sx={{color:'black',textAlign:'left',fontSize:'medium',fontWeight:'700',marginRight:'5px',marginTop:'2px'}}>DAO</Typography>
                </Box>
            </Box>

            <Box sx={{display:'flex',marginBottom:'30px',marginTop:'15px'}}>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#d7d3cf',borderRadius:'5px',marginRight:'5px', fontSize: '16px',fontWeight: '700',textAlign: 'center', verticalAlign: 'middle',lineHeight: '30px'}}>100</Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#d7d3cf',borderRadius:'5px',marginRight:'5px', fontSize: '16px',fontWeight: '700',textAlign: 'center', verticalAlign: 'middle',lineHeight: '30px'}}>200</Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#d7d3cf',borderRadius:'5px',marginRight:'5px', fontSize: '16px',fontWeight: '700',textAlign: 'center', verticalAlign: 'middle',lineHeight: '30px'}}>500</Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#d7d3cf',borderRadius:'5px',marginRight:'5px', fontSize: '16px',fontWeight: '700',textAlign: 'center', verticalAlign: 'middle',lineHeight: '30px'}}>Max</Box>
            </Box>

            <Box sx={{width:'320px',height:'56px',alignItems:'center',textAlign:'center',backgroundColor:'#e57714',color:'white',fontSize:'20px',borderRadius:'5px',lineHeight:'56px',cursor:'pointer'}}>
                Connect To MetaMask
            </Box>



            {/*<RiArrowRightCircleFill 
            style={{height:"40px",width:"40px",cursor:"pointer",position:'absolute',top:'0',left:'0'}} 
            onClick={toggleDrawer(anchor, true)}/>*/}
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

BetslipSideDrawer.propTypes = {
    setSlipOpen: PropTypes.func,
    isSlipOpened: PropTypes.bool
  };
  
