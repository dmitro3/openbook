import {ListItem,Button,Menu,MenuItem} from '@mui/material';
import React from 'react';

const options = [
    'Dashboard',
    'Your Tickets',
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
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return(
        <div>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >

            {/*<Avatar>
              <UserCircleIcon fontSize="small" />
            </Avatar>*/}

            <Button sx={{fontSize: '20px', color: 'black',whiteSpace: 'nowrap'}}>{props.userAddress}</Button>
            
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