import { FooterCustomDivider } from '@components/Footer/FooterCustomDivider';
import { DaiIcon } from '@components/Icons/DaiIcon';
import { FooterLink } from '@components/Footer/FooterLink';
import { PolygonIcon } from '@components/Icons/PolygonIcon';
import { MetaMaskIcon } from '@components/Icons/MetaMaskIcon';
import { CoinBaseIcon } from '@components/Icons/CoinBaseIcon';
import { Box,Container, Grid, Typography, Link } from '@mui/material';

import { styled, experimental_sx as sx } from '@mui/system';

export const FooterBox = styled(Box)((props)=> sx({
  paddingBottom:'200px',
  marginTop:"100px",
  // overflow:'hidden'
}))


export const FooterGridIitem = styled(Grid)((props)  => sx({
  padding: "15px 0px !important",
  display: 'flex',
  justifyContent: 'center'
}));

export const FooterGridContainer = styled(Grid)((props)  => sx({
  margin: "0px !important",
  backgroundColor:"var(--bg-color)",
  width: "100%"
}));

export const FooterLinkTopPart = styled(Link)((props)  => sx({
  display:'block', 
  color:'black',
  width: 'fit-content',
  [props.theme.breakpoints.down("sm")]: {
    fontSize: "14px"
  },
}));

export const FooterTitleTypography = styled(Typography)((props)  => sx({
  display:'block', 
  color:'black', 
  fontSize:'25px',
}));

export const FooterTopPartBox = styled(Box)((props)  => sx({
  maxWidth: 'fit-content',
  minWidth: '241px',
  [props.theme.breakpoints.down("sm")]: {
    "padding":"0px 0px !important",
    minWidth: "127px",
  },
}));

export const FooterBottomPartSpanText = styled('span')((props)  => sx({
  marginRight:'5px',
  fontSize:'18px',
  fontWeight:'500',
  display: "flex",
  alignItems: "center",
}));

export const FooterBottomPartSpanLogo = styled('span')((props)  => sx({
  marginLeft:'5px',
  fontSize:'18px',
  fontWeight:'500', 
  display: "flex",
  alignItems: "center",
  color:props.color
}));

export const MobileViewBox = styled(Box)((props)=>sx({
  display:"flex",

}))



export const Footer = () => {
    return(
        <FooterBox>
          <FooterCustomDivider/>
            <Container>
              <FooterGridContainer container spacing={3}>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6}>
                  <FooterTopPartBox>
                      <FooterTitleTypography>About</FooterTitleTypography>
                        {["Privacy Policy","About Us", "Documentation" ,"Terms and Conditions"].map((item,index)=>{
                          if(index==2)
                            return(<FooterLinkTopPart  underline="hover" key={index} target="_blank" rel="noopener noreferrer"  href="https://docs.openbook.bet/">{item}</FooterLinkTopPart>)              
                          else 
                            return( <FooterLinkTopPart underline="hover" key={index} href="#">{item}</FooterLinkTopPart>)
                        })}
                  </FooterTopPartBox>
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6} >
                <FooterTopPartBox>
                  <FooterTitleTypography>Community</FooterTitleTypography>
                  {["Leaderboards","Blog", "Twitter" ,"Discord"].map((item,index)=>{
                    return(
                      <FooterLinkTopPart sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</FooterLinkTopPart>
                    )
                  })}
                </FooterTopPartBox>
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6} >
                <FooterTopPartBox>
                  <FooterTitleTypography >Support</FooterTitleTypography>
                  {["About Us","FAQ", "General Betting Rules", "Contact Information"].map((item,index)=>{
                    return(
                      <FooterLinkTopPart sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</FooterLinkTopPart>
                    )
                  })}
                </FooterTopPartBox>  
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6} >
                <FooterTopPartBox>
                  <FooterTitleTypography>Developers</FooterTitleTypography>
                  {["API","GitHub", "Smart Contracts" ,"Polygon"].map((item,index)=>{
                    return(
                      <FooterLinkTopPart sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</FooterLinkTopPart>
                    )
                  })}
                </FooterTopPartBox>
                </FooterGridIitem>
              </FooterGridContainer>
            </Container>
          <FooterCustomDivider/>
          <Box sx={{  
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'left',
                  flexWrap: 'wrap',
                  marginTop: '16px',
                  marginBottom: '16px'}}>
            <Container>
              <FooterGridContainer container spacing={3}>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6}>
                  <FooterTopPartBox>
                  <FooterLink><FooterBottomPartSpanText>BET WITH</FooterBottomPartSpanText>
                  <MobileViewBox>
                    <DaiIcon/><FooterBottomPartSpanLogo color='#f3ad38'>DAI</FooterBottomPartSpanLogo>
                  </MobileViewBox>  
                  </FooterLink>
                  </FooterTopPartBox>
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6}>
                <FooterTopPartBox>
                <FooterLink><FooterBottomPartSpanText>DEPOSIT WITH</FooterBottomPartSpanText>
                <MobileViewBox>
                  <CoinBaseIcon/><FooterBottomPartSpanLogo color='#1652f0'>Coinbase</FooterBottomPartSpanLogo>
                </MobileViewBox>
                </FooterLink>
                </FooterTopPartBox>
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6}>
                <FooterTopPartBox>
                 <FooterLink><FooterBottomPartSpanText>CONNECT BY</FooterBottomPartSpanText>
                 <MobileViewBox>
                 <MetaMaskIcon/><FooterBottomPartSpanLogo color='#de7111'>MetaMask</FooterBottomPartSpanLogo>
                 </MobileViewBox>
                 </FooterLink>
                 </FooterTopPartBox>
                </FooterGridIitem>
                <FooterGridIitem item lg={3} sm={6} xl={3} xs={6}>
                <FooterTopPartBox>
                  <FooterLink><FooterBottomPartSpanText>POWERED BY</FooterBottomPartSpanText>
                  <MobileViewBox>
                  <PolygonIcon/><FooterBottomPartSpanLogo color='#854ee7'>Polygon</FooterBottomPartSpanLogo>
                  </MobileViewBox>
                  </FooterLink>
                </FooterTopPartBox>
                </FooterGridIitem> 
              </FooterGridContainer>
            </Container>

          </Box>
          <FooterCustomDivider style={{marginBottom:'0px'}}/>
          <Box>
            <Typography align="right" sx={{marginRight:'2.5%'}} >1.0.0</Typography>
          </Box>
        </FooterBox>
    )
}