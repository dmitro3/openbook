import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  ListItem,
  MenuItem,
  Menu,
  Tab,
  Tabs
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserCircle as UserCircleIcon } from "../utils/icons/user-circle";
import React from 'react';
import { Bell as BellIcon } from "../utils/icons/bell";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const options = [
  'Dashboard',
  'Your Tickets',
  'Settings',
  'Support',
  'Disconnect Wallet'
];

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [value, setValue] = React.useState("one");

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
          height: "10%"
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            fontSize: "20rem"
          }}
        >
        
          {
          //Menu for the side bar menu component, appears when the screen width below certain value.
          }
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>


          <Box sx={{ width: '100%', borderColor: 'divider'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            
          >
            <Tab value="one" /*sx={{fontSize:'1.3rem'}}*/ label="Bet Now" />
            <Tab value="two" /*sx={{fontSize:'1.3rem'}}*/ label="Be the Bookie" />
          </Tabs>
        </Box>

          {
          //This is the component that helps separate the left side and the right side of the nav bar
          }
          <Box sx={{ flexGrow: 1 }} />

          {
          //This is the notificaiton component from the template
          }
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton> 
          </Tooltip>
          

          <div>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <Avatar>
              <UserCircleIcon fontSize="small" />
            </Avatar>
            </ListItem>
            <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
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
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
