import { useEffect, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import { styled, experimental_sx as sx } from '@mui/system';

//redux
import {connect} from "react-redux";
import {setSelectedVaultAddress} from '@actions/vaultsAction'
 

export const VaultsBox = styled(Box)((props)  => sx({
  minHeight: "80vh",
  width: '100%'
}));


const VaultSelectDropDown = (props) => {

    const handleChange = (event) => {
      props.setSelectedVaultAddress(event.target.value);
    };

    
  return (
    <>
    { 
    props.vaults_state.vaults.length <= 0 ? 
    <h1> vaults not found </h1>  
    : 
    <Box sx={{minWidth:'200px'}}>
    <FormControl fullWidth>
      <Select
        value={props.vaults_state.selectedVaultAddress}
        onChange={handleChange}
      >
        {
            props.vaults_state.vaults.map((vault,index)=>{
                return(
                <MenuItem value={vault.PROVIDER} key={index}>
                    <Box sx={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        {props.vaults_state.selectedVaultAddress === vault.PROVIDER ?
                        <Typography variant="h5">✔️</Typography>
                        : 
                        <Box></Box>
                        }

                        <Typography variant="h5">
                            {vault.VAULT_NAME}
                        </Typography>
                    </Box>
                </MenuItem>
                )
            })
        }
      </Select>
    </FormControl>
  </Box>    
    }   
    </>
  );
};

const mapStateToProps = (state) => {
    return {
        vaults_state: state.vaults
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setSelectedVaultAddress: (address) => {
        dispatch(setSelectedVaultAddress(address))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(VaultSelectDropDown);
