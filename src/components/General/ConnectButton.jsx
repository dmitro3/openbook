import {Button} from '@mui/material';
import { styled, experimental_sx as sx } from '@mui/system';
import { MetaMaskIcon } from '@components/Icons/MetaMaskIcon';

export const ConnectMetaMaskButtonButton = styled(Button)((props)  => sx({
    width:'fit-content',
    px:'30px',
    marginLeft:'20px', 
    marginRight: '20px',
    fontSize:'16px',
    color:'white', 
    backgroundColor:'#e57714',
    '&:hover': {backgroundColor: '#ef882b',color:'white'},
    whiteSpace: 'nowrap',
    '&: after':{
        content: '"Connect Wallet"'
    },
    [props.theme.breakpoints.down("sm")]: {
        whiteSpace: 'normal',
        px:'15px',
        fontSize: '12px',
        ml:'0px',
        mr:'10px',
        py:'5px',
        backgroundColor: 'white',
        '&: hover':{
            backgroundColor:'white',
        },
        '&: after':{
            content: '""'
        }
    },
}));

export const ConnectMetaMaskButtonIcon = styled('div')((props)  => sx({
    [props.theme.breakpoints.up("sm")]: {
        display: 'none !important',
    }
}));

export const ConnectButton = (props) => {
    return(
        
    <ConnectMetaMaskButtonButton 
          onClick={() => {props.connectMetaMask();props.setDisconnected(false)}}
          variant="contained"
          style={props.style}>
          <ConnectMetaMaskButtonIcon><MetaMaskIcon/></ConnectMetaMaskButtonIcon>
    </ConnectMetaMaskButtonButton>)
}

