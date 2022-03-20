import {ListItem,Button,Menu,MenuItem, Avatar} from '@mui/material';
import React, { useEffect } from 'react';

import { CustomAvatar } from './CustomAvatar';

const options = [
    'Settings',
    'Support',
    'Disconnect Wallet'
  ];
  
export const DisplayUserAddressButton = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if(index==2){
          props.disconnectMetaMask();
        }
        else if(index == 0){
          props.openSettingsModal();
        }
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const userAddress = props.userAddress;
    const preferUsername = props.preferUsername;

    return(
        <div>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            sx={{width:'fit-content',px:'0px',py:'0px',marginLeft:'20px'}}
          >

            <Button sx={{fontSize: '15px', color: 'black',whiteSpace: 'nowrap',backgroundColor:'#f5f5f5',px:'20px',py:'10px',minWidth:'157px'}}>{preferUsername}<Avatar sx={{marginLeft:'10px'}}><CustomAvatar seed={userAddress}/>
            </Avatar></Button>
            
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
                right: '18px',
                left: 'auto !important' 
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