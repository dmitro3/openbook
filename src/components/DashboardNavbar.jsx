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
  Button,
  Tab,
  Tabs
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from 'react';
import { Bell as BellIcon } from "@utils/icons/bell";
import {checkWeb3, connectMetaMask} from "@utils/web3Provider";
import {ConnectButton} from "@components/Dashboard/ConnectButton";
import {DisplayUserAddressButton} from "@components/Dashboard/DisplayUserAddressButton";
import {LoadingMetaMaskButton} from "@components/Dashboard/LoadingMetaMaskButton";
import { InstallMetaMaskButton } from "@components/Dashboard/InstallMetaMaskButton";
import { InstallMetaMaskSnackBar } from "@components/Dashboard/InstallMetaMaskSnackBar";
import { WrapTab } from "./WrapTab";
import { BetIcon } from "./Dashboard/BetIcon"; 
import { TrophyIcon } from "./Dashboard/TrophyIcon";
import { TicketIcon } from "./Dashboard/TicketIcon"
import { LedgerIcon } from "./Dashboard/LedgerIcon";

// Redux
import {connect} from "react-redux";


/* Function that sets the navigation theme from template */
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const DashboardNavbar = (props) => {
  /* Side navigation variables */
  const { onSidebarOpen, ...other } = props;
  /* Side navigation variables */

  /* Top navigation bar tabs variables */
  const [navigationTabsValue, setNavigationTabsValue] = React.useState(1);
  /* End top navigation bar tabs variables */

    /* Top navigation bar tabs variables */
    const handleNavigationTabsChange = (event, newValue) => {
      setNavigationTabsValue(newValue);
    };
    /* End top navigation bar tabs variables */

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

            <Tabs
              value={navigationTabsValue}
              aria-label="secondary tabs example"
              onChange={handleNavigationTabsChange}
              TabIndicatorProps={/*{style: {background:'#be5df6'}}*/{style:{backgroundColor:'#837dec'}}}
              // className={'cutom-navigation-tabs'}
            >
                <WrapTab value={1} href="/" label="Bet Now" icon={<BetIcon/>} iconPosition="start" sx={{py:'0px'}} />
                <WrapTab value={2} href="/bookie" label="Bookie" icon={<LedgerIcon/>} iconPosition="start" sx={{py:'0px'}}/>
                <WrapTab value={3} href="/testing" label="My Bets"icon={<TicketIcon/>} iconPosition="start" sx={{py:'0px'}}/>
                <WrapTab value={4} href="/featured" label="Leaderboard" icon={<TrophyIcon/>} iconPosition="start" sx={{py:'0px'}}/>
            </Tabs>
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
            props.user.web3Loading ? <LoadingMetaMaskButton/> : !props.user.provider ?  <><InstallMetaMaskButton/><InstallMetaMaskSnackBar/></> :props.user.loggedIn ? <DisplayUserAddressButton userAddress={props.user.userAddress}/> : <ConnectButton connectMetaMask={connectMetaMask}/>
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

