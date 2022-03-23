import {Button,Snackbar} from '@mui/material';
import React from 'react';

export const InstallMetaMaskButton = () => {
    return(
        <Button 
            sx={{whiteSpace: 'nowrap',marginLeft:'20px', fontSize:'16px', color:'white', backgroundColor:'#e57714','&:hover': {backgroundColor: '#ef882b',color:'white'}}}variant="contained">
            <a style={{color:'white',textDecoration:'none'}} rel="noreferrer" target="_blank" href="https://metamask.io/">Please Install MetaMask</a>
        </Button>
    )
}