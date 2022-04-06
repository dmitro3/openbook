import styles from '@styles/landing.module.css';
import { NavBar } from '@components/Landing/NavBar';
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import Image from 'next/image'
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { LandingFooter } from '@components/Landing/LandingFooter';
import KUTE from "kute.js";
import {useEffect,useState} from 'react';

const featureText = {
    0: "OpenBook is a trustless betting platform, and all smart contracts are audited publicly.",
    1: "OpenBook is built on Polygon, the average block processing time is 2.1 seconds.",
    2: "No user data and centralized database is used in OpenBook, fully decentralized.",
    3: "Compare to traditional sports book APP, we only charge a small percentage of commision."
}

const Dashboard = (props) => {
    const [featureButtonState,setFeatureButtonState] = useState(0)

    useEffect(() => {
        const blobMorph = KUTE.fromTo(
            '#blob1',
            {path: '#blob1'},
            {path: '#blob2'},
            {repeat: 9999,duration: 3000,yoyo: true}
        )
    
        blobMorph.start();
    },[])

    
    return (
        <>
            <NavBar landingStyles={styles} />

            <Box className={styles.banner} sx={{ textAlign: 'center' }}>
                <Box sx={{ paddingTop: '50px', paddingBottom: '100px' }}>
                    <Box sx={{ marginBottom: '50px' }}>
                        <Typography  sx={{ color: '#00ff66', marginBottom: '30px', fontSize: '32px' }}>
                            Bet & Win Today!
                        </Typography>

                        <Typography sx={{ color: 'white', marginBottom: '30px', fontSize: '76px', fontWeight: 700 }}>
                            Best Decentralized Betting Platform
                        </Typography>

                        <Typography sx={{ color: '#e2e1ff', marginBottom: '50px', fontSize: '24px' }}>
                            The fastest, easiest way to bet on sports.
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
                backgroundColor: '#0d102f', paddingTop: '50px', textAlign: 'center', alignItems: 'center', justifyContent: 'center',
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
                <Container sx={{ py: '30px', borderRadius: '20px', marginTop: '100px',    marginBottom: '30px' }}>
                    <Grid container spacing={3}>
                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                            <Box className={`${featureButtonState == 0 ? styles.feature_active : styles.feature_inactive} ${styles.feature_box}`}
                            onClick={()=>{setFeatureButtonState(0)}}
                            >
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-1.png"></img>
                                <Box>
                                    <Typography className={styles.secondPageText}>
                                        Trustless
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <Box className={`${featureButtonState == 1 ? styles.feature_active : styles.feature_inactive} ${styles.feature_box}`}
                        onClick={()=>{setFeatureButtonState(1)}}
                        >
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-2.png"></img>
                                <Box>
                                    <Typography className={styles.secondPageText}>
                                        Limitless
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <Box className={`${featureButtonState == 2 ? styles.feature_active : styles.feature_inactive} ${styles.feature_box}`}
                        onClick={()=>{setFeatureButtonState(2)}}
                        >
                                <img src="https://pixner.net/bitbetio/main/assets/images/icon/about-icon-3.png"></img>
                                <Box >
                                    <Typography className={styles.secondPageText}>
                                        Decentralized
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <Box className={`${featureButtonState == 3 ? styles.feature_active : styles.feature_inactive} ${styles.feature_box}`}
                        onClick={()=>{setFeatureButtonState(3)}}
                        >
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
                <Box className={styles.blobBox}>
                <svg className={styles.blob} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g transform="translate(46.44994873134789 52.48685072018171)"><path id="blob1" d="M21.2 -34.3C29.5 -32 39.4 -30.3 45.3 -24.6C51.2 -19 53.1 -9.5 53.9 0.5C54.7 10.4 54.4 20.8 48.6 26.6C42.8 32.4 31.4 33.5 22.4 34.8C13.3 36.1 6.7 37.6 -0.8 39C-8.3 40.5 -16.7 41.9 -25.5 40.5C-34.3 39 -43.6 34.8 -46.2 27.6C-48.9 20.3 -44.9 10.2 -44.2 0.4C-43.5 -9.3 -46 -18.7 -44 -27C-42 -35.4 -35.5 -42.8 -27.4 -45.2C-19.3 -47.5 -9.7 -44.7 -1.6 -42C6.5 -39.3 13 -36.5 21.2 -34.3" fill="#11153e"></path></g>
                    <g className={styles.blob2} transform="translate(48.89033565101411 49.51054507577982)"><path id="blob2"d="M26.9 -47.1C33 -43.1 34.7 -32 38.5 -23C42.2 -14 48.1 -7 47.7 -0.2C47.3 6.5 40.6 13 35.5 19.8C30.4 26.6 26.9 33.6 21.3 39.7C15.7 45.8 7.8 50.9 0.6 49.9C-6.7 48.9 -13.3 41.8 -19.4 35.9C-25.5 30.1 -30.9 25.5 -35.9 19.8C-40.9 14 -45.5 7 -45.5 0C-45.5 -7 -40.9 -14 -36.7 -21.1C-32.4 -28.1 -28.5 -35.3 -22.4 -39.3C-16.3 -43.3 -8.2 -44.1 1.1 -46.1C10.4 -48 20.8 -51.1 26.9 -47.1" fill="#11153e"></path></g>
                </svg>
                    <Typography className={styles.blob_text}>
                        {featureText[featureButtonState]}
                    </Typography>

                </Box>


                <img className={styles.coin} src="https://pixner.net/bitbetio/main/assets/images/coin-4.png"/>
                <img className={styles.ballon} src="https://pixner.net/bitbetio/main/assets/images/crypto-fanus-1.png"/>
                <img className={styles.ballon2} src="https://pixner.net/bitbetio/main/assets/images/crypto-fanus-2.png"/>
                <img className={styles.coin2} src="https://pixner.net/bitbetio/main/assets/images/coin-1.png"/>
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
            <Box className={styles.subscribeSection}>
            <Box className={styles.subscribeBox}>
            <Box className={styles.subscribeBoxTypoBox}>
            <Typography className={styles.subTitle}>
                Subscribe Us
            </Typography>

            <Typography className={styles.title}>
                For Newsletter
            </Typography>

            <Typography className={styles.detailDescriptions}>
                Subscribe to our newsletter to receive all the latest news and updates
            </Typography>
            </Box>

            <Box className={styles.subscribeInputBox}>
                <input className={styles.subscribeInput} type="text" placeholder="Enter Your Email"/>
                <button className={styles.subscribeButton}><img src="https://pixner.net/bitips/main/assets/images/icon/send-icon.png" alt="icon"/></button>
            </Box>

            </Box>
            </Box>

            <LandingFooter />
        </>
    )

}

export default Dashboard;