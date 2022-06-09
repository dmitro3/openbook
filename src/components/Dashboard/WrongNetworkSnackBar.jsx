import {Snackbar,Alert,Button} from '@mui/material';
import React from 'react';

export const WrongNetworkSnackBar = (props) => {
    const kovanChainId = '0x2A';
    const vertical = "top";
    const horizontal = "right";
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') 
            return
        setOpen(false);
    }

    const swtichToKovan = async (event,reason) => {
        try {
            await props.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: kovanChainId}],
            });
            console.log("You have succefully switched to Kovan Test network")
            } 
        catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                console.log("This network is not available in your metamask, please add it")
            }
            console.log("Failed to switch to the network")
            }   
        finally{
                handleClose()
            }  
    }

    return (
        <Snackbar
        ContentProps={{
          sx: {
            color: "#FFFFFF",
            backgroundColor: "#d32f2f"
          },
        }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        sx={{top:'80px !important'}}
        action={
            <>
            <Button color="inherit" size="small" onClick={()=>swtichToKovan()}>
              Switch to Kovan
            </Button>
            <Button color="inherit" size="small" onClick={()=>handleClose()}>
              Close
            </Button>
            </>

        }
        message="Please select Kovan as your MetaMask test network."
        >
        </Snackbar>
    )
}