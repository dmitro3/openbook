import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField'
import {IoTrashBinSharp,IoTicketOutline} from 'react-icons/io5'
import { Grid } from '@mui/material';


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
            sx={{ width: '320px',
                backgroundColor:"white",
                position:'fixed',
                height:'fit-content',
                borderRadius: '4px',
                overflow: 'hidden',
                right: '15px',
                top: '128px',
                
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}

            
        >
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
                <IoTicketOutline style={{marginRight:'10px',height:'20px',width:'20px'}}/>
                Bet Slip
            </Box>
            <Box sx={{borderBottom:'1px solid #d9d9d9',display:'flex',alignItems: 'center',justifyContent: 'center',}}>
                <IoTrashBinSharp  style={{marginLeft:'12px',height:'25px',width:'10%', cursor:'pointer'}}/>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    TabIndicatorProps={{style: {backgroundColor: "white"}}}
                    sx={{width:'100%'}}
                    
                >
                    <Tab value="Single Bet"  label="Single Bet" sx={{fontSize:'14px',paddingRight:'0px'}}/>
                    <Tab value="Paylay" label="Parlay" sx={{fontSize:'14px',paddingRight:'0px'}}/>
                    <Tab value="Others" label="Others" sx={{fontSize:'14px',paddingRight:'0px'}}/>
                </Tabs>
            </Box>
            <Box sx={{maxHeight:"60vh",overflow:'overlay',marginBottom:'10px'}}>
                <List>
                {['1', '2', '3', '4','5','1','1', '2', '3', '4','5','1','1', '2', '3', '4','5','1','1', '2', '3', '4','5','1'].map((text, index) => (
                    <Box key={index} 
                    sx={{height:'95px',width:'100%',backgroundColor:'#dacdcd',marginBottom:'5px'}}>
                    </Box>
                ))}
                </List>
            </Box>

            <Box sx={{width:'95%',textAlign:'center',borderRadius:'5px',border:'1px solid black',marginLeft:'auto',marginRight:'auto',marginBottom:'10px'}}>
                <TextField sx={{width:'40%',border:'none'}} id="outlined-basic" variant="outlined" placeholder='0.00'/>
            </Box>

            <Box sx={{display:'flex',marginBottom:'15px'}}>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#dacdcd',borderRadius:'5px',marginRight:'5px'}}></Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#dacdcd',borderRadius:'5px',marginRight:'5px'}}></Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#dacdcd',borderRadius:'5px',marginRight:'5px'}}></Box>
                    <Box sx={{height:'28px',width:'76px',backgroundColor:'#dacdcd',borderRadius:'5px',marginRight:'5px'}}></Box>
            </Box>

            <Box sx={{width:'320px',height:'56px',alignItems:'center',textAlign:'center',backgroundColor:'#e57714',color:'white',fontSize:'20px',borderRadius:'5px',lineHeight:'56px'}}>
                Connect To MetaMask
            </Box>


            {/*<RiArrowRightCircleFill 
            style={{height:"40px",width:"40px",cursor:"pointer",position:'absolute',top:'0',left:'0'}} 
            onClick={toggleDrawer(anchor, true)}/>*/}
        </Box>  
    );

    return (
        <React.Fragment key={anchor}>
            {list(anchor)}
        </React.Fragment>
    );
}
