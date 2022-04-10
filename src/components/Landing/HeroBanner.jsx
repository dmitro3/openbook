import { Box, Typography, Button} from '@mui/material';
import Image from 'next/image';
export const HeroBanner = (props) => {
    let styles = props.styles;
    return(
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
    )
}