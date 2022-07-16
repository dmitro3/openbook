import {
    Button,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { VaultOverViewChart } from "@components/Vaults/VaultOverviewChart";
import { styled, experimental_sx as sx } from '@mui/system';


const statusToColor = {
    'active': {
        backgroundColor: 'rgba(43, 169, 114, 0.2)',
        color: '#2ba972'
    },
    'ACTIVE':{
        backgroundColor: 'rgba(43, 169, 114, 0.2)',
        color: '#2ba972'
    },
    'ready': {
        backgroundColor: 'rgb(255 194 37 / 20%)',
        color: 'rgb(191 144 25);'
    },
    'READY':{
        backgroundColor: 'rgb(255 194 37 / 20%)',
        color: 'rgb(191 144 25);'
    },
    'disabled' : {
        backgroundColor: 'rgba(43, 169, 114, 0.2)',
        color: '#2ba972' 
    },
    'DISABLED':{
        backgroundColor: 'rgba(43, 169, 114, 0.2)',
        color: '#2ba972' 
    }
}



export const VaultsCard = styled(Card)((props)  => sx({
  
}));

export const VaultsCardContent = styled(CardContent)((props)  => sx({
  
}));

export const VaultsCardNameTypography = styled(Typography)((props)  => sx({
  color: props.maincolor,
  fontSize:'30px',
  fontWeight: 'bold',
  mt:'10px'
}));

export const VaultsCardDataTypography = styled(Typography)((props)  => sx({
  fontSize:'17px',
  fontWeight: 'normal'
}));

export const VaultsCardDataActiveTypography = styled(Typography)((props)  => sx({
    fontSize:'17px',
    fontWeight: 'normal',
    color: statusToColor[props.status]['color'],
    backgroundColor: statusToColor[props.status]['backgroundColor'],
    "borderRadius":"4px",
    "display":"flex",
    "alignItems":"center",
    "padding":"4px 8px",
    textTransform:'capitalize',
    '&:before':{
      "content":'""',
      backgroundColor: statusToColor[props.status]['color'],
      "width":"4px",
      "height":"4px",
      "borderRadius":"50%",
      "marginRight":"4px"
    }
}));
  



export const VaultCard = (props) => {
    return(
        <VaultsCard>
            <VaultsCardContent>
                <Box>
                <VaultOverViewChart data={props.data}/>
                </Box>
                <VaultsCardNameTypography maincolor={props.mainColor}>
                {props.vaultName}
                </VaultsCardNameTypography>
                <Box sx={{my:"30px"}}>
                <Box sx={{display:'flex',justifyContent:'space-between',my:'7px'}}>
                    <VaultsCardDataTypography>
                        Volume: 
                    </VaultsCardDataTypography>
                    <VaultsCardDataTypography>
                        {props.volume} DAI
                    </VaultsCardDataTypography>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',my:'7px'}}>
                    <VaultsCardDataTypography>
                        Expected APR: 
                    </VaultsCardDataTypography>
                    <VaultsCardDataTypography>
                        {props.apr}%
                    </VaultsCardDataTypography>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',my:'7px'}}>
                    <VaultsCardDataTypography>
                        Status: 
                    </VaultsCardDataTypography>
                    <VaultsCardDataActiveTypography status={props.status}>
                        {props.status}
                    </VaultsCardDataActiveTypography>
                </Box>
                </Box>

                <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',mt:'50px'}}>
                <Button variant="contained" onClick={()=>props.handleVaultDetailPopupClickOpen()}>
                    Details
                </Button>
                </Box>
            </VaultsCardContent>
        </VaultsCard>
    )
    
}