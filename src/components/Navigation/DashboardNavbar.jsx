import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Tabs,
  useMediaQuery,
  Typography,
  Button
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "@utils/icons/bell";
import {checkWeb3, connectMetaMask, disconnectMetaMask, switchAccount, getChainName} from "@utils/web3Provider";
import {ConnectButton} from "@components/General/ConnectButton";
import {DisplayUserAddressButton} from "@components/Navigation/DisplayUserAddressButton";
import {LoadingMetaMaskButton} from "@components/General/LoadingMetaMaskButton";
import { InstallMetaMaskButton } from "@components/General/InstallMetaMaskButton";
import { InstallMetaMaskSnackBar } from "@components/General/InstallMetaMaskSnackBar";
import { WrapTab } from "@components/Navigation/WrapTab";
import { BetIcon } from "@components/Icons/BetIcon"; 
import { TrophyIcon } from "@components/Icons/TrophyIcon";
import { TicketIcon } from "@components/Icons/TicketIcon"
import { LedgerIcon } from "@components/Icons/LedgerIcon";
import {SettingsModal} from "@components/Settings/SettingsModal"
import {useState,useEffect, useMemo} from "react"
import { DaiIcon } from "@components/Icons/DaiIcon";
import {Notification} from "@utils/icons/notification";
import {useRouter} from "next/router";
import {MobileWrapTab} from './MobileWrapTab';
import {VaultIcon} from "@components/Icons/VaultIcon"


// Redux
import {connect} from "react-redux";
import {setOddsFormat,setPreferUsername,setPreferAvatarStyle,setDisconnected} from "redux/actions/settingsActions";
import { WrongNetworkSnackBar } from "@components/General/WrongNetworkSnackBar";

import { styled, experimental_sx as sx } from '@mui/system';
import VaultSelectDropDown from "@components/Vaults/VaultSelectDropDown";


/* Function that sets the navigation theme from template */
const NavbarRoot = styled(AppBar)(( props ) => sx({
  backgroundColor: props.theme.palette.background.paper,
  boxShadow: props.theme.shadows[3],
  left: {
    lg: 280,
  },
  width: {
    lg: "calc(100% - 280px)",
  },
  paddingRight: '0px !important',
  py:'0.3rem'
}));

const NavToolBar = styled(Toolbar)(( props ) => sx({
  minHeight: 64,
  left: 0,
  px: 0.5,
  fontSize: "20rem"
}));

const NavIconButton = styled(IconButton)(( props ) => sx({
  display: "none",
  [props.theme.breakpoints.down("lg")]: {
    display: "inline-flex"
  },
}));

const NavBigBothTabsBox = styled(Box)((props)=> sx({
  borderColor: 'divider',
  width: "100%",
  [props.theme.breakpoints.down("smpad")]: {
    width: "80%"
  },
}))

const NavBigScreenTabsBox = styled(Box)((props)=> sx({
  display: "flex",
  [props.theme.breakpoints.down("smpad")]: {
    display: "none"
  },
}))

const NavSmallScreenTabsBox = styled(Box)((props)=> sx({
  display: "none",
  [props.theme.breakpoints.down("smpad")]: {
    display: "flex"
  },
}))

const NavNetworkNameBox = styled(Box)((props)=> sx({
  display: "flex",
  [props.theme.breakpoints.down("md")]: {
    display: "none"
  },
}))

const NavBellIconBox = styled(Box)((props)=> sx({
  display: "flex",
  [props.theme.breakpoints.down("md")]: {
    display: "none"
  },
}))

const DashboardNavbar = (props) => {
  /* Properties for settings modal */
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleClickOpen = () => {
      setSettingsModalOpen(true);
    };

    const handleClose = () => {
      setSettingsModalOpen(false);
    };  

  /* Side navigation variables */
  const { onSidebarOpen, ...other } = props;
  /* Side navigation variables */

  /* Top navigation bar tabs variables */
  const [navigationTabsValue, setNavigationTabsValue] = useState(1);

  const handleNavigationTabsChange = (event, newValue) => {
    setNavigationTabsValue(newValue);
  };

  const { asPath } = useRouter()

  useMemo(()=>{
    if(asPath.search("bookie") != -1)
      setNavigationTabsValue(2)
    else if(asPath.search("account") != -1)
      setNavigationTabsValue(3)
    else if(asPath.search("leaderboard") != -1)
      setNavigationTabsValue(4)
    else if(asPath.search("featured") != -1 || asPath.search("favorite") != -1 || asPath.search("Match") != -1)
      setNavigationTabsValue(1)
    else
      setNavigationTabsValue(false)
  },[asPath])
  
    /* End top navigation bar tabs variables */

  function confirmSettings(settings){
    props.setPreferUsername(props.user.userAddress,settings.preferUsername);
    props.setOddsFormat(settings.oddsFormat);
    props.setPreferAvatarStyle(props.user.userAddress,settings.preferAvatarStyle);
  }

  return (
    <>    
      <NavbarRoot>
        <NavToolBar disableGutters>
          {
          //Menu for the side bar menu component, appears when the screen width is too small.
          }
          <NavIconButton onClick={onSidebarOpen}>
            <MenuIcon fontSize="small" />
          </NavIconButton>
          
          <NavBigBothTabsBox>
            <NavBigScreenTabsBox>
              <Tabs
                scrollButtons={false}
                value={navigationTabsValue}
                aria-label="secondary tabs example"
                onChange={(e,value)=>{handleNavigationTabsChange(e,value)}}
                TabIndicatorProps={/*{style: {background:'#be5df6'}}*/{style:{backgroundColor:'#837dec'}}}
              >
                  <WrapTab value={1} href="/featured" label="Bet Now" icon={<BetIcon/>} iconPosition="start" sx={{py:'0px'}} />
                  <WrapTab value={2} href="/account" label="My Bets" icon={<TicketIcon/>} iconPosition="start" sx={{py:'0px', visibility:`${props.user.loggedIn? "visible" : "hidden"}`, position:`${props.user.loggedIn ? "relative" : "absolute"}`}} />
                  <WrapTab value={3} href="/vaults" label="Vaults" icon={<VaultIcon/>} iconPosition="start" sx={{py:'0px'}}/>
                  <WrapTab value={4} href="/leaderboard" label="Leaderboard" icon={<TrophyIcon/>} iconPosition="start" sx={{py:'0px'}}/>
              </Tabs>

            </NavBigScreenTabsBox>

            <NavSmallScreenTabsBox>
              <Tabs
                scrollButtons={false}
                value={navigationTabsValue}
                aria-label="icon label tabs example"
                onChange={(e,value)=>{handleNavigationTabsChange(e,value)}}
                TabIndicatorProps={/*{style: {background:'#be5df6'}}*/{style:{backgroundColor:'#837dec'}}}
              >
                  <MobileWrapTab value={1} href="/featured" label="Bet Now" icon={<BetIcon/>} iconPosition="start" />
                  <MobileWrapTab value={2} href="/account" label="My Bets" icon={<TicketIcon/>} iconPosition="start" sx={{visibility:`${props.user.loggedIn? "visible" : "hidden"}`, position:`${props.user.loggedIn ? "relative" : "absolute"}`}} />
                  <MobileWrapTab value={3} href="/vaults" label="Vaults" icon={<VaultIcon/>} iconPosition="start"/>
                  <MobileWrapTab value={4} href="/leaderboard" label="Leaderboard" icon={<TrophyIcon/>} iconPosition="start"/>
              </Tabs>
            </NavSmallScreenTabsBox>
          </NavBigBothTabsBox>

          {
          //This is the component that helps separate the left side and the right side of the top nav bar
          }
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display:'flex',flexGrow: 1 }}>
          </Box>
    
          {
            props.user.web3Loading ? 
            <LoadingMetaMaskButton/> : 
            !props.user.hasProvider ?  
            <><InstallMetaMaskButton/><InstallMetaMaskSnackBar/></> :
            props.user.loggedIn ? 
            
            <>
            {/* <NavBellIconBox>
              <Tooltip title="Notifications">
                <IconButton sx={{ ml: '1rem',mr:'0.5rem'}}>
                  <Badge badgeContent={4} color="primary" variant="dot">
                    <Notification fontSize="big" />
                  </Badge>
                </IconButton> 
              </Tooltip>   
            </NavBellIconBox> */}

            <VaultSelectDropDown/>
          
            <NavNetworkNameBox>
              {props.user.currentNetWork=='kovan' || props.user.currentNetWork == 'private' || props.user.currentNetWork == '' ? void(0) : <WrongNetworkSnackBar provider={props.user.provider} />}
              <Typography sx={{color:"#4591ff",ml:"20px",fontSize:'1.5rem', textTransform: "capitalize"}}>
                {props.user.currentNetWork}
              </Typography>
            </NavNetworkNameBox>

            <NavNetworkNameBox sx={{width:'200px',whiteSpace: "nowrap"}}>
              <Button variant="text" >Get Testnet DAI 💰</Button>
            </NavNetworkNameBox>

            <DisplayUserAddressButton 
              preferUsername={props.settings.preferUsername[props.user.userAddress]} 
              preferAvatarStyle={props.settings.preferAvatarStyle[props.user.userAddress]} 
              userAddress={props.user.userAddress} 
              disconnectMetaMask={disconnectMetaMask} 
              openSettingsModal={handleClickOpen}
              setDisconnected={props.setDisconnected} 
              balance={props.user.balance}
              testnet= {props.user.currentNetWork}
            /> 
            </> 
            : 
            <ConnectButton setDisconnected={props.setDisconnected} 
              connectMetaMask={connectMetaMask}
            />
          }

        </NavToolBar>
      <SettingsModal fullScreen={fullScreen} open={settingsModalOpen} handleClose={handleClose} preferUsername ={props.settings.preferUsername[props.user.userAddress]} oddsFormat={props.settings.oddsFormat} preferAvatarStyle={props.settings.preferAvatarStyle[props.user.userAddress]} confirmSettings={confirmSettings} userAddress={props.user.userAddress}/>
      </NavbarRoot>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user,
      settings: state.settings
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setPreferUsername: (userAddress,preferUserName) => {
        dispatch(setPreferUsername(userAddress,preferUserName));
      },
      setOddsFormat: (oddsFormat) => {
        dispatch(setOddsFormat(oddsFormat))
      },
      setPreferAvatarStyle: (userAddress,preferAvatarStyle) => {
        dispatch(setPreferAvatarStyle(userAddress,preferAvatarStyle))
      },
      setDisconnected: (disconnected) => {
        dispatch(setDisconnected(disconnected))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);

