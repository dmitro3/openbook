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
  Slide,
  Checkbox,
  Tooltip
} from "@mui/material";
import { styled, experimental_sx as sx } from '@mui/system';
import {createVault} from "@utils/web3Provider";
import { SettingsAccessibility } from "@mui/icons-material";


  const steps = [
    'Gerneral Info',
    'Vault Details',
    'Confirmation',
  ];
  
  const inputs = [
    "Vault Name",
    "Provider Address",
    "Initial Vault Deposit",
    "Imbalance Threshold",
    "Imbalance Ratio"
  ]

  const defaultValues = {
    vaultName: '',
    providerAddress: '',
    fundSize: '0',
    riskTolerance: '5',
    vigorish: '3',
    allowExternalLP: true
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  export const QuestionTextField = styled(TextField)((props)  => sx({
    '& .MuiFilledInput-root': {
      backgroundColor: 'white'
    }
}));

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

    const [values, setValues] = useState(defaultValues);

  
    const handleChange = (prop) => (event) => {
      if(prop=="allowExternalLP"){
        setValues({ ...values, [prop]: event.target.checked ? true: false });
      }
      else{
        setValues({ ...values, [prop]: event.target.value });
      }


    };

    return (
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        PaperProps={{
          sx:{
            minWidth:'500px'
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
              sx={{minHeight:'263px'}}
            >
            { activeStep == 0 ? 
              <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <QuestionTextField
                label={inputs[0]}
                variant="filled"
                margin="normal"
                value={values.vaultName}
                onChange={handleChange('vaultName')}
              />
              <QuestionTextField
                label={inputs[1]}
                variant="filled"
                margin="normal"
                value={values.providerAddress}
                onChange={handleChange('providerAddress')}
                placeholder="0x000...000"
                helperText="Ethereum address that will provide odds"
              />
            <QuestionTextField
                label={inputs[2]}
                variant="filled"
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
             <Tooltip title={"This is  % of total liquidity betted in a single outcome after which the inbalance ratio check and limit will kick off."} 
             arrow 
             disableFocusListener 
             disableTouchListener 
             enterDelay={700}
             placement="top">
              <QuestionTextField
                  label={inputs[3]}
                  variant="filled"
                  margin="normal"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputMode: 'numeric', 
                    pattern: '[0-9]*' 
                  }}
                  value={values.riskTolerance}
                  onChange={handleChange('riskTolerance')}
                />
             </Tooltip>

             <Tooltip title={"If the imbalance threshold has been met and one outcome gets n% of the bets, stop taking bet in that outcome, where is the number selected."} 
             arrow 
             disableFocusListener 
             disableTouchListener 
             enterDelay={700}
             placement="top">
              <QuestionTextField
                label={inputs[4]}
                variant="filled"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  inputMode: 'numeric', 
                  pattern: '[0-9]*' 
                }}
                value={values.vigorish}
                onChange={handleChange('vigorish')}
              />
             </Tooltip>



              <Box sx={{display:'flex',justifyContent:'space-between',mt:'16px',mb:'8px',alignItems:'center'}}>
                <Typography>Allow external LP?</Typography>
                <Checkbox checked={values.allowExternalLP} onChange={handleChange("allowExternalLP")} />
              </Box>
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
                  <Box sx={{display: 'flex', justifyContent:'space-between'}} key={index}>
                    <Typography sx={{}}>
                      {input}:
                    </Typography>
                    <Typography sx={{color: "#5048e5",fontWeight: "bold", width:`${index==1 ? '70%' : 'auto'}`, overflowX: 'auto'}}>
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

            { activeStep == 3 ? /*success step*/
              <h1>Vault created success!</h1>
              :
              void(0)
            }

            { activeStep == 4 ? /*success step*/
              <h1>Vault created failed!</h1>
              :
              void(0)
            }           
            
          </Box>

        </DialogContent>
        <DialogActions>
        {
          activeStep == 0 
          ?
          <>
          <Button onClick={()=>handleNext()}>
                Next
          </Button>
          </>

          :
          void(0)
        }

        {
          activeStep == 1
          ?
          <>
          <Button onClick={()=>handleBack()}>
                Back
          </Button>
          <Button onClick={()=>handleNext()}>
                Next
          </Button>
          </>

          :
          void(0)
        }

        {
          activeStep == 2
          ?
          <>
            <Button onClick={()=>handleBack()}>
                  Back
            </Button>
            <Button onClick={async ()=>{
              try{
                let result = await createVault(values);
                result ? setActiveStep(3) :  setActiveStep(4)
              }
              catch (error){
                setActiveStep(4);
              }
            }}>
                  Finish
            </Button>
          </>

          :
          void(0)
        }

        {
          activeStep == 3 || activeStep == 4
          ?
          <Button onClick={()=>{
            setActiveStep(0);
            setValues(defaultValues);
            props.handleClose();
          }}>close</Button>
          :
          void(0)
        }

        
        </DialogActions>
      </Dialog>
    )
}