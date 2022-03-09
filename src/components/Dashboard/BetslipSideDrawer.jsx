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
import {RiArrowRightCircleFill,RiTicket2Line,} from 'react-icons/ri';
import {IoTrashBinSharp,IoTicketOutline} from 'react-icons/io5'


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
                position:'relative',
                height:'100%',
                borderRadius: '4px',
                overflow: 'hidden',
                marginRight: '15px'
                
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
                    sx={{width:'90%'}}
                    
                >
                    <Tab value="Single Bet"  label="Single Bet" sx={{fontSize:'12px'}}/>
                    <Tab value="Paylay" label="Parlay" sx={{fontSize:'12px'}}/>
                    <Tab value="Others" label="Others" sx={{fontSize:'12px'}}/>
                </Tabs>
            </Box>
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <List>
            {['All mail', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            {/*<RiArrowRightCircleFill 
            style={{height:"40px",width:"40px",cursor:"pointer",position:'absolute',top:'0',left:'0'}} 
            onClick={toggleDrawer(anchor, true)}/>*/}
        </Box>
    );

    return (
    <div>
        <React.Fragment key={anchor}>
            
            {list(anchor)}
        </React.Fragment>
    </div>
    );
}
