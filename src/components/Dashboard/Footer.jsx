import { FooterCustomDivider } from '@components/Dashboard/FooterCustomDivider';
import { DaiIcon } from '@components/Dashboard/DaiIcon';
import { FooterLink } from '@components/Dashboard/FooterLink';
import { PolygonIcon } from '@components/Dashboard/PolygonIcon';
import { MetaMaskIcon } from '@components/Dashboard/MetaMaskIcon';
import { CoinBaseIcon } from '@components/Dashboard/CoinBaseIcon';
import { Box,Container, Grid, Typography, Link } from '@mui/material';
export const Footer = () => {
    return(
        <Box>
        <Box sx={{paddingBottom:'200px'}}>
          <FooterCustomDivider/>
            <Container>
              <Grid container spacing={3} sx={{backgroundColor:'#f9fafc',marginLeft:'45px'}}>
                <Grid item lg={6} sm={12} xl={3} xs={12}>
                  <Typography sx={{display:'block', color:'black', fontSize:'25px'}}>About</Typography>
                  {["Privacy Policy","About Us", "Documentation" ,"Terms and Conditions"].map((item,index)=>{
                    return(
                      <Link sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</Link>
                    )
                  })}
                </Grid>
                <Grid item lg={6} sm={12} xl={3} xs={12} >
                  <Typography sx={{display:'block', color:'black', fontSize:'25px'}}>Community</Typography>
                  {["Leaderboards","Blog", "Twitter" ,"Discord"].map((item,index)=>{
                    return(
                      <Link sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</Link>
                    )
                  })}
                </Grid>
                <Grid item lg={6} sm={12} xl={3} xs={12} >
                  <Typography sx={{display:'block', color:'black', fontSize:'25px'}}>Support</Typography>
                  {["About Us", "Responsive Gambling" ,"FAQ", "General Betting Rules", "Contact Information"].map((item,index)=>{
                    return(
                      <Link sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</Link>
                    )
                  })}
                </Grid>
                <Grid item lg={6} sm={12} xl={3} xs={12} >
                  <Typography sx={{display:'block', color:'black', fontSize:'25px'}}>Developers</Typography>
                  {["API","GitHub", "Smart Contracts" ,"Polygon"].map((item,index)=>{
                    return(
                      <Link sx={{display:'block', color:'black'}} underline="hover" key={index} href="#">{item}</Link>
                    )
                  })}
                </Grid>
              </Grid>
            </Container>
          <FooterCustomDivider/>
          <Box sx={{  
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '16px',
                  marginBottom: '16px'}}>
            <FooterLink><span style={{marginRight:'10px',fontSize:'18px',fontWeight:'500'}}>BET WITH</span><DaiIcon/></FooterLink>
            <FooterLink><span style={{marginRight:'10px',fontSize:'18px',fontWeight:'500'}}>POWERED BY</span><PolygonIcon/><span style={{marginLeft:'10px',fontSize:'18px',fontWeight:'500',color:'#854ee7'}}>Polygon</span></FooterLink>
            <FooterLink><span style={{marginRight:'10px',fontSize:'18px',fontWeight:'500'}}>CONNECT WITH</span><MetaMaskIcon/><span style={{marginLeft:'10px',fontSize:'18px',fontWeight:'500', color:'#de7111'}}>MetaMask</span></FooterLink>
            <FooterLink><span style={{marginRight:'10px',fontSize:'18px',fontWeight:'500'}}>DEPOSIT WITH</span><CoinBaseIcon/><span style={{marginLeft:'10px',fontSize:'18px',fontWeight:'500',color:'#1652f0'}}>Coinbase</span></FooterLink>
          </Box>
          <FooterCustomDivider style={{marginBottom:'0px'}}/>
          <Box>
            <Typography align="right" sx={{marginRight:'2.5%'}} >1.0.0</Typography>
          </Box>
        </Box>
      </Box>
    )
}