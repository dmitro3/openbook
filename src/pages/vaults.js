import Head from "next/head";
import { useEffect, useState } from "react";
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
import {getAllVaults} from "@utils/web3Provider";

//redux
import {connect} from "react-redux";
import {setVaults,setSelectedVaultAddress} from '@actions/vaultsAction'
import VaultSelectDropDown from "@components/Vaults/VaultSelectDropDown";
 

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

    const [loadingVaults,setLoadingVaults] = useState(false);

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
              position: 'relative',
              flexDirection: 'column'
            }}
        > 
        {props.vaults_state.vaults == null ? 
        <h1>loading</h1> 
        :
        props.vaults_state.vaults.length <= 0 ? 
        <h1>Empty Vault</h1>
        : 
        <Box>
          <Box sx={{display:'flex',width:'100%',justifyContent:'flex-end',pb:'50px'}}>
            <VaultSelectDropDown/>
          </Box>
          <VaultsBox>
            <Grid container spacing={2}>
              {
                props.vaults_state.vaults.map((vault,index)=>{
                  return(
                    <Grid item xl={3} lgp={3} lg={3} md={4} smpad={4} sm={6} xs={12} key={index} >
                      <VaultCard
                      vaultName={vault.VAULT_NAME}
                      address={vault.ADDRESS}
                      mainColor={"#4591ff"}
                      volume={vault.VOLUME}
                      apr={vault.EXPECTED_APR}
                      status={vault.STATUS}
                      data={[5000,6000,6500,7000]}
                      handleVaultDetailPopupClickOpen={handleVaultDetailPopupClickOpen}
                      >
                      </VaultCard>
                    </Grid>
                  )
                })
              }
            </Grid>

            </VaultsBox>  
          {
            props.vaults_state.vaults.map((vault,index)=>{
              return(
                <VaultDetailsPopup key={index} open={vaultDetailsPopupOpen} handleClose={handleVaultDetailPopupClose} vault={vault}/>
              )
            })
          }    
        </Box>


  
        }
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
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user,
      vaults_state: state.vaults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVaults: (vaults) => {
        dispatch(setVaults(vaults));
    },
    setSelectedVaultAddress: (address) => {
      dispatch(setSelectedVaultAddress(address))
    }
};
};

BookieHomepage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};


export default connect(mapStateToProps, mapDispatchToProps)(BookieHomepage);
