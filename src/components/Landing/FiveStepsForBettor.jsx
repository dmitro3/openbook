import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';

export const FiveStepsForBettor = (props) => {
    let styles = props.styles;
    return(
        <Box sx={{ backgroundColor: '#070044', textAlign: 'center', paddingTop: '50px', paddingBottom:'100px', px: '10%' }}>

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
                            <Box className={styles.stepCountLeft}>05</Box>
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
    )
}

