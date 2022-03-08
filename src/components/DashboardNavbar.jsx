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

/* Function that sets the navigation theme from template */
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

/* This is the options for the user drop down */
const options = [
  'Dashboard',
  'Your Tickets',
  'Settings',
  'Support',
  'Disconnect Wallet'
];

export const DashboardNavbar = (props) => {
  /* Template variables */
  const { onSidebarOpen, ...other } = props;
  /* End template variables */

  /* User button drop down variables */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  /* End user button drop down variables */

  /* Top navigation bar tabs variables */
  const [value, setValue] = React.useState("one");
  /* End top navigation bar tabs variables */

  /* User button drop down functions */
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
  /* End user button drop down functions */

  /* Top navigation bar tabs variables */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /* End top navigation bar tabs variables */

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          }
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
          //Menu for the side bar menu component, appears when the screen width is too small.
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
          //This is the component that helps separate the left side and the right side of the top nav bar
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
          
          {
            //This is the user icon and the drop down
          }
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
