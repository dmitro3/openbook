import styles from '@styles/landing.module.css';
import { NavBar } from '@components/Landing/NavBar';
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import Image from 'next/image'
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { LandingFooter } from '@components/Landing/LandingFooter';


const Dashboard = (props) => {
    return (
        <>
            <NavBar landingStyles={styles} />

            <Box className={styles.banner} sx={{ textAlign: 'center' }}>
                <Box sx={{ paddingTop: '50px', paddingBottom: '100px' }}>
                    <Box sx={{ marginBottom: '50px' }}>
                        <Typography sx={{ color: '#00ff66', marginBottom: '30px', fontSize: '32px' }}>
                            Bet & Win Today!
                        </Typography>

                        <Typography sx={{ color: 'white', marginBottom: '30px', fontSize: '76px', fontWeight: 700 }}>
                            Best Decentralized Betting Platform
                        </Typography>

                        <Typography sx={{ color: '#e2e1ff', marginBottom: '50px', fontSize: '24px' }}>
                            The fastest, easiest way to bet on sports.NBA, Tennis & Soccer, Choose on which team to bet and win
                        </Typography>

                        <Button sx={{ px: '30px', py: '10px', backgroundColor: '#571ce0', border: '1px solid #571ce0', borderRadius: '25px', color: 'white' }}>
                            Get Started Now
                        </Button>
                    </Box>



                    <Box sx={{ height: '464px', width: '100%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-100px !important' }}>
                        {/* <Image src="/static/images/landing/landing_hero.png" layout="intrinsic" height="464" width="1920" style={{alignSelf:'flex-end',marginBottom:'-10px !important'}} ></Image> */}
                        <Image src="/static/images/landing/landing_hero_2.png" layout="intrinsic" height="464" width="1920" style={{ alignSelf: 'flex-end' }} ></Image>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                backgroundColor: '#0d102f', paddingTop: '100px', textAlign: 'center', alignItems: 'center', justifyContent: 'center',
                /*backgroundImage: "url(https://pixner.net/bitbetio/main/assets/images/amazing-features-bg.png)",*/ backgroundRepeat: "no-repeat",
                backgroundPositionY: 'center', backgroundPositionX: 'center',backgroundSize: "100%",position: 'relative'
            }}>
                <Typography sx={{ color: '#00ff66', marginBottom: '30px', fontSize: '32px' }}>
                    Web 3 Sports Beeting
                </Typography>
                <Typography sx={{ color: 'white', marginBottom: '30px', fontSize: '76px', fontWeight: 700 }}>
                    A Revolution in Online Betting
                </Typography>
                <Typography sx={{ color: '#e2e1ff', marginBottom: '30px', fontSize: '24px' }}>
                    OpenBook is a decentralized, limitless, web3 based and fast growing betting platform
                </Typography>
                <Container sx={{ py: '30px', borderRadius: '20px', marginTop: '100px' }}>
                    <Grid container spacing={3}>
                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                            <Box sx={{ textAlign: "center" }}>
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-1.png"></img>
                                <Box>
                                    <Typography className={styles.secondPageText}>
                                        Secure
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                            <Box sx={{ textAlign: "center" }}>
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-2.png"></img>
                                <Box>
                                    <Typography className={styles.secondPageText}>
                                        Limitless
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                            <Box sx={{ textAlign: "center" }}>
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-3.png"></img>
                                <Box >
                                    <Typography className={styles.secondPageText}>
                                        Decentralized
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                            <Box sx={{ textAlign: "center" }}>
                                <Image src="/static/images/landing/feature_icons_4.png" layout="intrinsic" height="160" width="160"></Image>
                                <Box>
                                    <Typography className={styles.secondPageText}>
                                        Low Commisions
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <img className={styles.coin} src="https://pixner.net/bitbetio/main/assets/images/coin-4.png"/>
                <img className={styles.ballon} src="https://pixner.net/bitbetio/main/assets/images/crypto-fanus-1.png"/>

            </Box>

            <Box className={styles.waveTransition}>

            </Box>

            <Box sx={{ backgroundColor: '#070044', textAlign: 'center', py: '100px', px: '10%' }}>
                <Box sx={{ mx: 'auto', textAlign: 'center' }}>
                    <Typography sx={{ color: '#00ff66', marginBottom: '30px', fontSize: '32px' }}>
                        Betting on your favorite team and win easy money
                    </Typography>

                    <Typography className={styles.title}>
                        5 simple steps for sports betting
                    </Typography>

                    <Typography sx={{ color: '#e2e1ff', marginBottom: '30px', fontSize: '24px' }}>
                        Our platform has been designed from the ground up to be tailored to the unique form of betting and settlement offered by the blockchain. Follow these simple steps and make profits!
                    </Typography>

                </Box>

                <Box>

                    <Grid container spacing={3}>
                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bettor_step_1.png" />
                                <Box className={styles.stepCountRight}>01</Box>
                            </Box>


                        </Grid>

                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                            <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                                Login to MetaMask
                            </Typography>
                            <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box>
                        <Image src="/static/images/landing/right_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                            <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                                Find your favorite match
                            </Typography>
                            <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Grid>

                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bettor_step_2.png" />
                                <Box className={styles.stepCountLeft}>02</Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box>
                        <Image src="/static/images/landing/left_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                    </Box>

                    <Grid container spacing={3}>

                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bettor_step_3.png" />
                                <Box className={styles.stepCountRight}>03</Box>
                            </Box>
                        </Grid>


                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                            <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                                Choose the winning team
                            </Typography>
                            <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box>
                        <Image src="/static/images/landing/right_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                            <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                                Place your bet
                            </Typography>
                            <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Grid>

                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bettor_step_4.png" />
                                <Box className={styles.stepCountLeft}>04</Box>
                            </Box>

                        </Grid>
                    </Grid>

                    <Box>
                        <Image src="/static/images/landing/left_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bettor_step_5.png" />
                                <Box className={styles.stepCountLeft}>04</Box>
                            </Box>
                        </Grid>

                        <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                            <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                                Collect your winning
                            </Typography>
                            <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Grid>
                    </Grid>

                </Box>
            </Box>


            <FaqForLanding landing_sytles={styles}></FaqForLanding>
            <LandingFooter />
        </>
    )

}

export default Dashboard;