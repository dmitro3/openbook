import {ListItem,Button,Menu,MenuItem, Avatar, Typography, Box} from '@mui/material';
import { useRef,useState } from 'react';
import { CustomAvatar } from '../General/CustomAvatar';
import { useRouter } from 'next/router'
import { styled, experimental_sx as sx } from '@mui/system';

export const DisplayUserAddressButtonListItem = styled(ListItem)((props)=> sx({
  width:'fit-content',
  px:'0px',
  py:'0px',
  marginLeft:'0px'
}))

export const DisplayUserAddressButtonButton = styled(Button)((props)=> sx({
    width:"fit-content",
    fontSize: '15px',
    color: 'black',
    whiteSpace: 'nowrap',
    pl:'20px',
    pr: '20px',
    py:'10px',
    '&:focus':{
      outline:'none'
    },
    [props.theme.breakpoints.down("sm")]: {
      pl: '0px',
      pr: '5px'
    },
  }))

export const DisplayUserAddressButtonAvatar = styled(Avatar)((props)=> sx({
  marginLeft:'10px',
  width:'50px',
  height:'50px',
  [props.theme.breakpoints.down("sm")]: {
    width:'40px',
    height: '40px',
  },
}))

export const DisplayUserAddressButtonAddressAndBalanceBox = styled(Box)((props)=>sx({
  marginLeft:'0.8rem',
  [props.theme.breakpoints.down("md")]: {
    display:'none'
  },
}))

export const DisplayUserAddressButtonAddressTypography = styled(Typography)((props)=>sx({
  fontFamily: "Roboto, sans-serif",
  fontSize: "1rem",
  fontWeight: "500",
  color:'#626972',
  textAlign:'left'
}))

export const DisplayUserAddressButtonBalanceBox = styled(Box)((props)=>sx({
  "display":"flex",
  "alignItems":"baseline"
}))

export const DisplayUserAddressButtonBalanceTypography = styled(Typography)((props)=>sx({
  "fontSize":"1.15rem",
  "fontWeight":"500",
  "margin":"0 0 0 0"
}))

export const DisplayUserAddressButtonWinningsTypography = styled(Typography)((props)=>sx({
  "fontSize":"0.875rem",
  "color":"#a3a9b0",
  "margin":"0",ml:'5px'
}))


export const DisplayUserAddressButtonMenuItem= styled(MenuItem)((props)=>sx({
  [props.theme.breakpoints.up("md")]: {
    display: `${props.index == 0 || props.index == 1 || props.index == 2 ? 'none' : 'flex'}`,
  },
}))

export const DisplayUserAddressButtonMenuTypography = styled(Typography)((props)=>sx({
  "fontSize":"1rem",
  "fontWeight":"500",
  [props.theme.breakpoints.down("md")]: {
    color: menuItemToColor[props.option],
  },
}))

const options = [
    'username',
    'balance',
    'testnet',
    'Get Testnet DAI',
    'Settings',
    'Support',
    'Log Out'
];

const menuItemToColor = {
  'username' : '#e57714',
  'balance' : '#57e334',
  'testnet' : '#4591ff'
}


  
export const DisplayUserAddressButton = (props) => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const ref = useRef(null);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleMenuItemClick = (event, index,option) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if(option=="Log Out"){
          props.disconnectMetaMask();
          props.setDisconnected(true);
          router.push('/featured');
        }
        else if(option=="Get Testnet DAI"){
          // Function here to get testnet DAI
        }
        else if(option == 'Settings'){
          props.openSettingsModal();
        }
        else if(option == 'Support'){
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
            <DisplayUserAddressButtonListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >

            <DisplayUserAddressButtonButton>
              <DisplayUserAddressButtonAvatar>
                <CustomAvatar style={{width:'46px'}} seed={userAddress} avatarStyle={props.preferAvatarStyle}/>
              </DisplayUserAddressButtonAvatar>
              <DisplayUserAddressButtonAddressAndBalanceBox>
                <DisplayUserAddressButtonAddressTypography>
                  {preferUsername}
                </DisplayUserAddressButtonAddressTypography>
                <DisplayUserAddressButtonBalanceBox >
                <DisplayUserAddressButtonBalanceTypography>
                {`${props.balance} DAI`}
                </DisplayUserAddressButtonBalanceTypography>
                {/* <DisplayUserAddressButtonWinningsTypography>                
                  +1800
                </DisplayUserAddressButtonWinningsTypography> */}
                </DisplayUserAddressButtonBalanceBox>
              </DisplayUserAddressButtonAddressAndBalanceBox>
            </DisplayUserAddressButtonButton>
            
            </DisplayUserAddressButtonListItem>
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
                width: `${ref.current ? ref.current.offsetWidth : 0}px`,
                '@media (max-width: 900px)' : {
                  width: 'fit-content'
                }
            } }}
          >
            {options.map((option, index) => {
              const returnTypography = "";
              switch(option){
                case "username":
                  returnTypography = <DisplayUserAddressButtonMenuTypography option={option}>{preferUsername}</DisplayUserAddressButtonMenuTypography>;
                  break;
                case "balance":
                  returnTypography = <DisplayUserAddressButtonMenuTypography option={option}>{`${props.balance} DAI`}</DisplayUserAddressButtonMenuTypography>;
                  break;
                case "testnet":
                  returnTypography = <DisplayUserAddressButtonMenuTypography option={option}>{props.testnet}</DisplayUserAddressButtonMenuTypography>
                  break;
                case "Get Testnet DAI":
                  returnTypography = <DisplayUserAddressButtonMenuTypography option={option}>{option} 💰</DisplayUserAddressButtonMenuTypography>
                  break;
                default:
                  returnTypography = <DisplayUserAddressButtonMenuTypography option={option}>{option}</DisplayUserAddressButtonMenuTypography>

              }
              return (
              <DisplayUserAddressButtonMenuItem
                key={option}
                index={index}
                onClick={(event) => handleMenuItemClick(event, index, option)}
              >
                {returnTypography}
              </DisplayUserAddressButtonMenuItem>
            )})}
            </Menu>
        </div>
    )
}