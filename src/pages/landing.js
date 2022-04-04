import styles from '@styles/landing.module.css';
import { NavBar } from '@components/Landing/NavBar';
import {Box,Typography,Button,Container,Grid} from '@mui/material'
import Image from 'next/image'
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { LandingFooter} from '@components/Landing/LandingFooter';


const Dashboard = (props) => 
{   
    return(
        <>
        <NavBar landingStyles={styles}/>
        <Box className={styles.banner} sx={{textAlign: 'center'}}>
            <Box sx={{paddingTop:'50px',paddingBottom:'100px'}}>
                <Box sx={{marginBottom:'50px'}}>
                    <Typography sx={{color:'#00ff66',marginBottom: '30px',fontSize:'32px'}}>
                        Bet & Win Today!
                    </Typography>

                    <Typography sx={{color:'white',marginBottom: '30px',fontSize:'76px',fontWeight:700}}>
                        Best Decentralized Betting Platform
                    </Typography>

                    <Typography sx={{color:'#e2e1ff',marginBottom: '50px',fontSize:'24px'}}>
                        The fastest, easiest way to bet on sports.NBA, Tennis & Soccer, Choose on which team to bet and win
                    </Typography>

                    <Button sx={{px:'30px',py:'10px',backgroundColor:'#571ce0',border:'1px solid #571ce0',borderRadius:'25px',color:'white'}}>
                        Get Started Now
                    </Button>
                </Box>
            


                <Box sx={{height:'464px',width:'100%',marginLeft:'auto',marginRight:'auto',display:'flex',alignItems:'center',justifyContent: 'center',marginBottom:'-100px !important'}}>
                    {/* <Image src="/static/images/landing/landing_hero.png" layout="intrinsic" height="464" width="1920" style={{alignSelf:'flex-end',marginBottom:'-10px !important'}} ></Image> */}
                    <Image src="/static/images/landing/landing_hero_2.png" layout="intrinsic" height="464" width="1920" style={{alignSelf:'flex-end'}} ></Image>
                </Box>
            </Box>
        </Box>
        <Box sx={{backgroundColor:'#070044;',paddingBottom:'200px', textAlign:'center', alignItems:'center',justifyContent:'center'}}>
        <Typography sx={{color:'#00ff66',marginBottom: '30px',fontSize:'32px'}}>
                Web 3 Sports Beeting
            </Typography>
            <Typography sx={{color:'white',marginBottom: '30px',fontSize:'76px',fontWeight:700}}>
                A Revolution in Online Betting
            </Typography>
            <Typography sx={{color:'#e2e1ff',marginBottom: '30px',fontSize:'24px'}}>
                OpenBook is a decentralized, limitless, web3 based and fast growing betting platform
            </Typography>
            <Container sx={{border:'1px solid white',py:'30px',borderRadius:'20px',marginTop:'100px'}}>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                    <Box sx={{textAlign:"center"}}>
                        <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-1.png"></img>
                        <Box>
                        <Typography className={styles.secondPageText}>
                                Secure
                            </Typography>
                        </Box>
                        </Box>
                        </Grid>

                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                    <Box sx={{textAlign:"center"}}>
                        <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-2.png"></img>
                        <Box>
                        <Typography className={styles.secondPageText}>
                                    Limitless
                                </Typography>
                            </Box>
                        </Box>     
                    </Grid>

                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <Box sx={{textAlign:"center"}}>
                        <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-3.png"></img>
                        <Box >
                        <Typography className={styles.secondPageText}>
                                    Decentralized
                                </Typography>
                            </Box>
                        </Box>    
                    </Grid>

                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <Box sx={{textAlign:"center"}}>
                        <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-4.png"></img>
                            <Box>
                            <Typography className={styles.secondPageText}>
                                   Community Based
                                </Typography>
                            </Box>
                        </Box>    
                    </Grid>
                </Grid>
                </Container>
        </Box>
        <FaqForLanding landing_sytles={styles}></FaqForLanding>       
        <LandingFooter/>
        </>
    )
    
}

export default Dashboard;