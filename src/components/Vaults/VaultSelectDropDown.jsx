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
 

export const VaultSelectionDrownDownLoadingTypography = styled(Typography)((props)  => sx({
  fontSize: '1.5rem',
  color: 'black',
  whiteSpace: 'nowrap'
}));


const VaultSelectDropDown = (props) => {
    const handleChange = (event) => {
      props.setSelectedVaultAddress(event.target.value);
    };
 
  return (
    <>

    <Box sx={{maxHeight:'50px',display:'flex'}}>
    { 
      props.vaults_state.vaults == null ? 
    <VaultSelectionDrownDownLoadingTypography variant="p"> vaults loading </VaultSelectionDrownDownLoadingTypography>
    :
    props.vaults_state.vaults.length <= 0 ? 
    <VaultSelectionDrownDownLoadingTypography variant="p"> vaults not found </VaultSelectionDrownDownLoadingTypography>
    : 
    <FormControl fullWidth>
      <Select
        value={props.vaults_state.selectedVaultAddress || ''}
        onChange={handleChange}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '0px',
            },   
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border:'none',
              borderBottomWidth: '1px',
              borderBottomColor:'#5048E5',
              borderBottomStyle: 'solid',
              borderRadius: "0px 0px 0 0"
            },    
        }}
      >
        {
            props.vaults_state.vaults.map((vault,index)=>{
                return(
                <MenuItem value={vault.ADDRESS} key={index}>
                    <Box sx={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        {props.vaults_state.selectedVaultAddress === vault.ADDRESS ?
                        <Typography variant="p" sx={{mr:'20px'}}>✔️</Typography>
                        : 
                        <Box></Box>
                        }

                        <Typography variant="p">
                            {vault.VAULT_NAME}
                        </Typography>
                    </Box>
                </MenuItem>
                )
            })
        }
      </Select>
    </FormControl>
  }  
  </Box>    
 
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
