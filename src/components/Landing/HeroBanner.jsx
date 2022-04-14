import { Box, Typography, Button, Grid} from '@mui/material';
import Image from 'next/image';
export const HeroBanner = (props) => {
    let styles = props.styles;
    return(
        <Box className={styles.banner} sx={{ textAlign: 'center' }}>
        <Box sx={{ paddingTop: '50px', paddingBottom: '100px'}}>
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
                

                {/* <Box sx={{mx:'auto',width:'80%',my:'100px'}}>
                <Grid container spacing={3}>
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <Box sx={{display:'flex',justifyContent: "center"}}>
                            <img src="https://cdn-icons.flaticon.com/png/512/1024/premium/1024776.png?token=exp=1649889011~hmac=1a91f5f20aa413727e915ae3a847b996" width={140} height={140}></img>
                            <Box sx={{display:'flex',flexDirection:'column',alignItems: "flex-start",alignContent: "stretch",justifyContent:"center",marginLeft:'20px'}}>
                                <Typography sx={{color:'white',fontSize:'43px',fontWeight:'500',textAlign:'left'}}>$1,304,941</Typography>
                                <Typography sx={{color:'#19ff60;',fontSize:'21px',textAlign:'left'}}>Paid out prize in total</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <Box sx={{display:'flex',justifyContent: "center"}}>
                        <img src="https://cdn-icons.flaticon.com/png/512/3113/premium/3113049.png?token=exp=1649889314~hmac=3d8564ffbce1441e62d5265bd8a0c028" width={140} height={140}></img>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems: "flex-start",alignContent: "stretch",justifyContent:"center",marginLeft:'20px'}}>
                            <Typography sx={{color:'white',fontSize:'43px',fontWeight:'500',textAlign:'left'}}>1,080</Typography>         
                            <Typography sx={{color:'#19ff60;',fontSize:'21px',textAlign:'left'}}>Winners</Typography>                      
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <Box sx={{display:'flex',justifyContent: "center"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/616/616519.png" width={140} height={140}></img>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems: "flex-start",alignContent: "stretch",justifyContent:"center",marginLeft:'20px'}}>
                            <Typography sx={{color:'white',fontSize:'43px',fontWeight:'500',textAlign:'left'}}>1,724</Typography>
                                <Typography sx={{color:'#19ff60;',fontSize:'21px',textAlign:'left'}}>MetaMask accounts connected</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                </Box> */}


            </Box>



            <Box sx={{ height: '464px', width: '100%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-100px !important' }}>
                {/* <Image src="/static/images/landing/landing_hero.png" layout="intrinsic" height="464" width="1920" style={{alignSelf:'flex-end',marginBottom:'-10px !important'}} ></Image> */}
                <Image src="/static/images/landing/landing_hero_2.png" layout="intrinsic" height="464" width="1920" style={{ alignSelf: 'flex-end' }} ></Image>
            </Box>
        </Box>
    </Box>
    )
}