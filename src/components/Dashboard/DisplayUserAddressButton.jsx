import {ListItem,Button,Menu,MenuItem} from '@mui/material';
import React from 'react';

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
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const userAddress = props.userAddress;
    const displayAddress = `${userAddress.slice(0,5)}...${userAddress.slice(userAddress.length-4)}`

    return(
        <div>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            sx={{
              padding:'0px',
              marginLeft:'15px'
            }}
          >

            {/*<Avatar>
              <UserCircleIcon fontSize="small" />
            </Avatar>*/}

            <Button sx={{fontSize: '15px', color: 'black',whiteSpace: 'nowrap',backgroundColor:'#f5f5f5',px:'32px',py:'10px'}}>{displayAddress}</Button>
            
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
                right: '12px',
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