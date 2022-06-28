import {Button} from '@mui/material';
import React from 'react';
import { styled, experimental_sx as sx } from '@mui/system';
import { MetaMaskIcon } from '@components/Icons/MetaMaskIcon';

export const InstallMetaMaskButtonButton = styled(Button)((props)  => sx({
    width:'fit-content',
    px:'30px',
    marginLeft:'20px', 
    marginRight: '20px',
    fontSize:'16px',
    color:'white', 
    backgroundColor:'#e57714',
    '&:hover': {backgroundColor: '#ef882b',color:'white'},
    whiteSpace: 'nowrap',
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
        }
    },
}));

export const InstallMetaMaskButtonAnchor = styled('a')((props)  => sx({
    color:'white',
    textDecoration:'none',
    '&: after':{
        content: '"Please Install Metamask"'
    },
    [props.theme.breakpoints.down("sm")]: {
        '&: after':{
            content: '""'
        }
    }
}));

export const InstallMetaMaskButtonIcon = styled('div')((props)  => sx({
    [props.theme.breakpoints.up("sm")]: {
        display: 'none !important',
    }
}));



export const InstallMetaMaskButton = (props) => {
    return(
        <InstallMetaMaskButtonButton 
            sx variant="contained"
            style={props.style}
            >
            <InstallMetaMaskButtonAnchor rel="noreferrer" target="_blank" href="https://metamask.io/"><InstallMetaMaskButtonIcon><MetaMaskIcon/></InstallMetaMaskButtonIcon></InstallMetaMaskButtonAnchor>

        </InstallMetaMaskButtonButton>
    )
}