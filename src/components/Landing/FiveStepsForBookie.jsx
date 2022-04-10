import { Box, Typography, Grid } from '@mui/material';
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
                            Go to the bookie page
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                            Watch your money grow
                        </Typography>
                        <Typography sx={{ fontWeight: '400', marginBottom: '16px', color: 'white', fontSize: '18px', width: '80%' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

