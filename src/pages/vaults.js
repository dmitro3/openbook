import Head from "next/head";
import { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stepper,
  Step,
  StepLabel,
  InputAdornment 
} from "@mui/material";

import { DashboardLayout } from "@components/Navigation/DashboardLayout";
import { styled, experimental_sx as sx } from '@mui/system';
import * as React from 'react';
import { object } from "prop-types";


export const VaultsBox = styled(Box)((props)  => sx({
  
}));

export const VaultsCard = styled(Card)((props)  => sx({
  
}));

export const VaultsCardContent = styled(CardContent)((props)  => sx({
  
}));

export const VaultsCardNameTypography = styled(Typography)((props)  => sx({
  color: '#4591ff',
  fontSize:'30px',
  fontWeight: 'bold'
}));

export const VaultsCardLiquidityPoolSizeTypography = styled(Typography)((props)  => sx({
  color: 'orange',
  fontSize:'25px',
  fontWeight: 'normal'
}));

const steps = [
  'Gerneral Info',
  'Vault Details',
  'Confirmation',
];

const inputs = [
  "Vault Name",
  "Etheruem Address",
  "Fund Size",
  "Risk Tolerance",
  "Vigorish"
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookieHomepage = (props) => {
  // const [bookieTabsValue, setBookieTabsValue] = useState("staking");
  // const handleBookieTabsChange = (event, newValue) => {
  //   setBookieTabsValue(newValue);
  // };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      if(activeStep==2)
        return;
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
      if(activeStep==0)
        return;
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [values, setValues] = React.useState({
      vaultName: '',
      ethAddress: '',
      fundSize: '',
      riskTolerance: '5',
      vigorish: '3'
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
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
              position: 'relative'
            }}
        > 
          <VaultsBox>
            <VaultsCard>
              <VaultsCardContent>
                  <VaultsCardNameTypography>
                    OpenBook Official Vault
                  </VaultsCardNameTypography>
                  <VaultsCardLiquidityPoolSizeTypography>
                    20000 DAI
                  </VaultsCardLiquidityPoolSizeTypography>
                  <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <Button variant="contained">
                      Details
                    </Button>
                  </Box>

              </VaultsCardContent>
            </VaultsCard>
          </VaultsBox>


          <Box sx={{
            position: 'absolute',
            right:'20px',
            bottom: '0'
          }}>
            <Button variant="contained" onClick={()=>{handleClickOpen()}}>
              Add Vault
            </Button>
          </Box>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
              style:{
                minWidth:'600px'
              }
            }}
            
          >
            <DialogTitle>{"Create Vault"}</DialogTitle>
            <DialogContent>
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                { activeStep == 0 ? 
                  <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <TextField
                    label={inputs[0]}
                    defaultValue=""
                    variant="standard"
                    margin="normal"
                    value={values.vaultName}
                    onChange={handleChange('vaultName')}
                  />
                  <TextField
                    label={inputs[1]}
                    defaultValue=""
                    variant="standard"
                    margin="normal"
                    value={values.ethAddress}
                    onChange={handleChange('ethAddress')}
                    placeholder="0xf6a960a726317b4cb09a35bb510906162f55b1b00f6c37978edb86f7465f793f"
                  />
                <TextField
                    label={inputs[2]}
                    defaultValue=""
                    variant="standard"
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">DAI</InputAdornment>,
                    }}
                    value={values.fundSize}
                    onChange={handleChange('fundSize')}
                />
                </Box>            
                : 
                    void(0)
                }

                
                { activeStep == 1 ? 
                  <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <TextField
                    label={inputs[3]}
                    defaultValue="5"
                    variant="standard"
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      inputMode: 'numeric', 
                      pattern: '[0-9]*' 
                    }}
                    value={values.riskTolerance}
                    onChange={handleChange('riskTolerance')}
                  />
                  <TextField
                    label={inputs[4]}
                    defaultValue="3"
                    variant="standard"
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      inputMode: 'numeric', 
                      pattern: '[0-9]*' 
                    }}
                    value={values.vigorish}
                    onChange={handleChange('vigorish')}
                  />
                </Box>            
                : 
                    void(0)
                }


                { activeStep == 2 ? 
                  <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt:'20px'
                }}>
                {
                  inputs.map((input,index)=>{
                    return(
                      <Box sx={{display: 'flex'}} key={index}>
                        <Typography sx={{width:'30%'}}>
                          {input}:
                        </Typography>
                        <Typography sx={{ml:'20px',width:'30%'}}>
                          {Object.values(values)[index]}
                          {index==2  ? 'DAI' : ''}
                          {index==3 || index==4 ? '%' : ''}
                        </Typography>
                      </Box>
                    )
                  })
                }


                </Box>            
                : 
                    void(0)
                }
                
              </Box>

            </DialogContent>
            <DialogActions>
            {
              activeStep != 0 
              ?
              <Button onClick={()=>handleBack()}>
                    Back
              </Button>
              :
              void(0)
            }

            {
              activeStep != 2
              ?
              <Button onClick={()=>handleNext()}>
                    Next
              </Button>
              :
              void(0)
            }
            {
              activeStep == 2
              ?
              <Button onClick={()=>handleNext()}>
                    Finish
              </Button>
              :
              void(0)
            }
            </DialogActions>
          </Dialog>

      </Box>
    </>
  );
};

BookieHomepage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BookieHomepage;
