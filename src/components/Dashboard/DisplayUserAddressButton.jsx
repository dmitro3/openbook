import {ListItem,Button,Menu,MenuItem, Avatar, Typography, Box} from '@mui/material';

import { useRef,useState } from 'react';

import { CustomAvatar } from './CustomAvatar';

import { useRouter } from 'next/router'

const options = [
    'Settings',
    'Support',
    'Disconnect Wallet'
  ];
  
export const DisplayUserAddressButton = (props) => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const ref = useRef(null);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if(index==2){
          props.disconnectMetaMask();
          props.setDisconnected(true);
        }
        else if(index == 0){
          props.openSettingsModal();
        }
        else if(index == 1){
          router.push("/support")
        }
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const userAddress = props.userAddress;
    const preferUsername = props.preferUsername;

    return(
        <div ref={ref}>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            sx={{width:'fit-content',px:'0px',py:'0px',marginLeft:'0px'}}
          >

            <Button sx={{fontSize: '15px', color: 'black',whiteSpace: 'nowrap',px:'20px',py:'10px',minWidth:'157px','&:focus':{
              outline:'none'
            }}}>
              <Avatar sx={{marginLeft:'10px',width:'50px',height:'50px'}}>
                <CustomAvatar style={{width:'46px'}} seed={userAddress} avatarStyle={props.preferAvatarStyle}/>
              </Avatar>
              <Box sx={{marginLeft:'0.8rem'}}>
                <Typography sx={{fontFamily: "Roboto, sans-serif",fontSize: "1rem",fontWeight: "500",color:'#626972',textAlign:'left'}}>
                  {preferUsername}
                </Typography>
                <Box sx={{"display":"flex","alignItems":"baseline"}}>
                <Typography sx={{"fontSize":"1.15rem","fontWeight":"500","margin":"0 0 0 0"}}>
                  {props.balance}$
                  {/* {5384.31} */}
                </Typography>
                {/* <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{marginTop: "auto",marginBottom: "auto"}}>
                <g>
                <title>Layer 1</title>
                <text strokeWidth="0" fontStyle="normal" fontWeight="normal" xmlSpace="preserve" textAnchor="start" fontFamily="Noto Sans JP" fontSize="20" id="svg_10" y="17.13073" x="3.03905" stroke="#000" fill="#000000">D</text>
                <line stroke="#000" id="svg_11" y2="8.94542" x2="18.13092" y1="8.77564" x1="2.77132" fill="none"/>
                <line stroke="#000" id="svg_13" y2="12.57495" x2="18.13092" y1="12.40517" x1="3.02163" fill="none"/>
                </g>
                </svg> */}
                <Typography sx={{"fontSize":"0.875rem","color":"#a3a9b0","margin":"0"}}>                
                  +4650
                </Typography>
                </Box>
              </Box>
            </Button>
            
            </ListItem>
            <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              role: 'listbox',
            }}
            PaperProps={{ sx: {
                right: '0px',
                left: 'auto !important',
                width: `${ref.current ? ref.current.offsetWidth : 0}px`
            } }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
            </Menu>
        </div>
    )
}