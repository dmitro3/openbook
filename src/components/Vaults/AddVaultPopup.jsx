import { useState,forwardRef } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Slide 
} from "@mui/material";


const steps = [
    'Gerneral Info',
    'Vault Details',
    'Confirmation',
  ];
  
  const inputs = [
    "Vault Name",
    "Provider Address",
    "Fund Size",
    "Risk Tolerance",
    "Vigorish"
  ]

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const AddVaultPopup = (props) => {
    
    const [activeStep, setActiveStep] = useState(0);

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

    const [values, setValues] = useState({
      vaultName: '',
      providerAddress: '',
      fundSize: '0',
      riskTolerance: '5',
      vigorish: '3'
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
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
                variant="standard"
                margin="normal"
                value={values.vaultName}
                onChange={handleChange('vaultName')}
              />
              <TextField
                label={inputs[1]}
                variant="standard"
                margin="normal"
                value={values.providerAddress}
                onChange={handleChange('providerAddress')}
                placeholder="0xf6a960a726317b4cb09a35bb510906162f55b1b00f6c37978edb86f7465f793f"
              />
            <TextField
                label={inputs[2]}
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
                      {index==2  ? ' DAI' : ''}
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
    )
}