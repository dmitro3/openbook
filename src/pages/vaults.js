import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Box,
  Grid,
} from "@mui/material";

import { DashboardLayout } from "@components/Navigation/DashboardLayout";
import { styled, experimental_sx as sx } from '@mui/system';
import { AddVaultPopup } from "@components/Vaults/AddVaultPopup";
import { VaultCard } from "@components/Vaults/VaultCard";
import { VaultDetailsPopup } from "@components/Vaults/VaultDetailsPopup";


export const VaultsBox = styled(Box)((props)  => sx({
  minHeight: "80vh",
  width: '100%'
}));




const BookieHomepage = (props) => {
  // const [bookieTabsValue, setBookieTabsValue] = useState("staking");
  // const handleBookieTabsChange = (event, newValue) => {
  //   setBookieTabsValue(newValue);
  // };

    const [addVaultPopupOpen, setAddVaultPopupOpen] = useState(false);

    const handleAddVaultPopupClickOpen = () => {
      setAddVaultPopupOpen(true);
    };

    const handleAddVaultPopupClose = () => {
      setAddVaultPopupOpen(false);
    };

    const [vaultDetailsPopupOpen,setVaultDetailsPopupOpen] = useState(false);

    const handleVaultDetailPopupClickOpen = () => {
      setVaultDetailsPopupOpen(true);
    };

    const handleVaultDetailPopupClose = () => {
      setVaultDetailsPopupOpen(false);
    };
    

  const vaults = [{'vaultName': "OpenBook Official Vault", "mainColor": "#4591ff", "volume": "7000", "apr": "4.5", "status": "active", "data": [5000,6000,6500,7000] }]

  return (
    <>
      <Head>
        <title>Vaults | OpenBook</title>
      </Head>
      <Box
            component="main"
            sx={{
              py: 8,
              display: 'flex',
              px:'10px',
              position: 'relative'
            }}
        > 
          <VaultsBox>
          <Grid container spacing={2}>
            /* loop here */
            <Grid item xl={3} lgp={3} lg={3} md={4} smpad={4} sm={6} xs={12} >
              <VaultCard vaultName={"OpenBook Official Vault"} mainColor={"#4591ff"} volume={7000} apr={4.5} status={'active'} data={[5000,6000,6500,7000]} handleVaultDetailPopupClickOpen={handleVaultDetailPopupClickOpen}/>
            </Grid>


          </Grid>

          </VaultsBox>

          <Box sx={{
            position: 'absolute',
            right:'50px',
            bottom: '50px'
          }}>
            <Button variant="contained" onClick={()=>{handleAddVaultPopupClickOpen()}}>
              Add Vault
            </Button>
          </Box>

          <AddVaultPopup open={addVaultPopupOpen} handleClose={handleAddVaultPopupClose}/>
          <VaultDetailsPopup open={vaultDetailsPopupOpen} handleClose={handleVaultDetailPopupClose} vaultName={"OpenBook Official Vault"}/>

      </Box>
    </>
  );
};

BookieHomepage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BookieHomepage;
