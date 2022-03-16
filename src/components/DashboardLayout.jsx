import { useState } from 'react';
import { Box,Container, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import  DashboardNavbar  from '@components/DashboardNavbar';
import { DashboardSidebar } from '@components/DashboardSidebar';
import { FooterCustomDivider } from '@components/Dashboard/FooterCustomDivider';
import { DaiIcon } from '@components/Dashboard/DaiIcon';
import { FooterLink } from './Dashboard/FooterLink';
import { PolygonIcon } from './Dashboard/PolygonIcon';
import { MetaMaskIcon } from './Dashboard/MetaMaskIcon';
import { CoinBaseIcon } from './Dashboard/CoinBaseIcon';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
          <Box>
            <Box sx={{paddingBottom:'200px'}}>
              <FooterCustomDivider/>
                <Container>
                  <Grid container spacing={3} sx={{backgroundColor:'#f9fafc'}}>
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
                      {["API","GitHub", "Smart Contract" ,"Polygon"].map((item,index)=>{
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
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
      
    </>
  );
};
