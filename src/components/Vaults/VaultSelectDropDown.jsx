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
import {setSelectedVaultIndex} from '@actions/vaultsAction'
 

export const VaultsBox = styled(Box)((props)  => sx({
  minHeight: "80vh",
  width: '100%'
}));


const VaultSelectDropDown = (props) => {

    const handleChange = (event) => {
      props.setSelectedVaultIndex(event.target.value);
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
        value={props.vaults_state.selectedVaultIndex}
        onChange={handleChange}
      >
        {
            props.vaults_state.vaults.map((vault,index)=>{
                return(
                <MenuItem value={index} key={index}>
                    <Box sx={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        {index == props.vaults_state.selectedVaultIndex ?
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
        setSelectedVaultIndex: (index) => {
        dispatch(setSelectedVaultIndex(index))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(VaultSelectDropDown);
