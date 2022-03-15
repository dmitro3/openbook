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
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserCircle as UserCircleIcon } from "@utils/icons/user-circle";
import React from 'react';
import { Bell as BellIcon } from "@utils/icons/bell";
import PrimaryNavTabs from "@components/Dashboard/PrimaryNavTabs";
import {checkWeb3, connectMetaMask} from "@utils/web3Provider";

// Redux
import {connect} from "react-redux";

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

const DashboardNavbar = (props) => {
  /* Template variables */
  const { onSidebarOpen, ...other } = props;
  /* End template variables */

  /* User button drop down variables */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  /* End user button drop down variables */

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

  React.useEffect(() =>{
    checkWeb3();
    
  },[])

  return (
    <>
      {/* <b style={{color:'black'}}>{props.user.web3Loading ? "Web3 is loading" : props.user.web3 ? "web3 is ready" : "install web3 plz"}</b>  */}
      
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
          paddingRight: '0px !important'
        }}
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
          <PrimaryNavTabs />
        </Box>

          {
          //This is the component that helps separate the left side and the right side of the top nav bar
          }
          <Box sx={{ flexGrow: 1 }} />

          {
          //This is the notification component from the template
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
            props.user.loggedIn ? 
            (<div>
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            sx={{fontSize: '20px', color: 'black',whiteSpace: 'nowrap',width: '300px',marginRight: '300px'}}
          >
            {/*<Avatar>
              <UserCircleIcon fontSize="small" />
            </Avatar>*/}
            {props.user.userAddress}
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
          </div>) : (<Button 
          onClick={() => connectMetaMask()}
          sx={{whiteSpace: 'nowrap',marginLeft:'20px', fontSize:'16px', color:'white', backgroundColor:'#e57714','&:hover': {backgroundColor: '#ef882b',color:'white'}}}variant="contained">
          Connect Wallet
          </Button>)
          }


        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
      user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);

