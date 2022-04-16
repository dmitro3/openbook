import { Box, Typography, Grid, Button } from '@mui/material';
import Image from 'next/image';

export const FiveStepsForBookie = (props) => {
    let styles = props.styles;
    return(
        <Box sx={{ backgroundColor: '#070044', textAlign: 'center', paddingTop: '50px', paddingBottom:'200px', px: '10%' }}>

            <Box sx={{ mx: 'auto', textAlign: 'center' }}>
                <Typography sx={{ color: '#00ff66', marginBottom: '30px', fontSize: '32px' }}>
                    Become a bookie and earn money
                </Typography>

                <Typography className={styles.title}>
                    5 simple steps to become a bookie
                </Typography>

                <Typography sx={{ color: '#e2e1ff', marginBottom: '30px', fontSize: '24px' }}>
                    Pay less fees when betting and win more
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
                            OpenBook is fully integrated with MetaMask, connected your MetaMask account to our app simply by clicking the 
                            <Button 
                                sx={{whiteSpace: 'nowrap',mx:'10px', fontSize:'16px', color:'white', backgroundColor:'#e57714','&:hover': {backgroundColor: '#ef882b',color:'white'}}} variant="contained">
                                Connect Wallet
                            </Button>
                         on the top right corner of the app. 
                        </Typography>
                    </Grid>
                </Grid>

                <Box>
                    <Image src="/static/images/landing/right_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                </Box>

                <Grid container spacing={3}>
                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                        <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                            Go to the bookie page
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            Select the bookie tab on the top navigation bar.
                        </Typography>
                    </Grid>

                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                        <Box sx={{ position: 'relative', width: 'fit-content' }}>
                            <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bookie_step_2.png" />
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
                            <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bookie_step_3.png"/>
                            <Box className={styles.stepCountRight}>03</Box>
                        </Box>
                    </Grid>


                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                        <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                            Deposit funds to our liquidity pool
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            Enter the amount of funds you wish to deposit, then click on the deposit fund button.
                        </Typography>
                    </Grid>
                </Grid>

                <Box>
                    <Image src="/static/images/landing/right_arrow.png" layout="intrinsic" height="191" width="250"></Image>
                </Box>

                <Grid container spacing={3}>
                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                        <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                            Watch your money grow
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            The bookie page is fully integrated with charts and figures; use them to understand your investments.
                        </Typography>
                    </Grid>

                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ display: 'flex', justifyContent: 'space-around', paddingLeft: '0px !important' }}>
                        <Box sx={{ position: 'relative', width: 'fit-content' }}>
                            <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bookie_step_4.png"/>
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
                            <Image layout="intrinsic" height="407" width="407" src="/static/images/landing/bookie_step_5.png"/>
                            <Box className={styles.stepCountLeft}>05</Box>
                        </Box>
                    </Grid>

                    <Grid item lg={6} sm={12} xl={6} xs={12} sx={{ textAlign: 'left', alignSelf: 'center' }} >
                        <Typography sx={{ fontWeight: '700', marginBottom: '16px', color: 'white', fontSize: '43px' }}>
                            Withdrawl anytime you want
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            Withdrawl your money anytime you want by click on the withdrawl button in the bookie page.
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

