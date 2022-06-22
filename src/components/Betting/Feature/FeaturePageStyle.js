import { styled, experimental_sx as sx } from '@mui/system';
import {Card, CardContent, Grid, Typography,Box} from '@mui/material';

export const FeatureMatchCard = styled(Card)((props)  => sx({
  height: '270px'
}));

export const FeatureMatchCardContent = styled(CardContent)((props)  => sx({
  height:"100%",
  position:'relative',
  paddingBottom:'100px', 
  marginTop:'0px'
}));

export const FeatureMatchCardGrid = styled(Grid)((props)  => sx({
   justifyContent: 'space-between',
   width:"100%",
   marginLeft:'0px',
   marginRight:'0px',
   marginTop:'0px'
}));

export const FeatureMatchCardGridItemTeam = styled(Grid)((props) => sx({
  paddingLeft:'0px',
  width:'35%',
  paddingTop: '20px'
}));

export const FeatureMatchCardGridItemTimeDate = styled(Grid)((props)  => sx({
  textAlign:'center',
  paddingLeft:'0px',
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  alignContent: "center",
  paddingTop:"20px"
}));

export const FeatureMatchCardTypographyTimeDate = styled(Typography)((props) => sx({
  textAlign:'center',
  paddingLeft:'0px',
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  alignContent: "center",
  paddingTop:"20px",
}));

export const FeatureMatchCardButtonsBox = styled(Box)((props)  => sx({
  display:"flex",
  alignItems: "center", 
  justifyContent: "center",
  position:'absolute',
  bottom:'7%',
  left:'2%',
  right:'2%'
}));
