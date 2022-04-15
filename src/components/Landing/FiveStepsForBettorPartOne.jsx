import { Box, Typography, Grid } from '@mui/material';

export const FiveStepsForBettorPartOne = (props) => {
    let styles = props.styles;
    return(
        <Box className={styles.fiveStepForBettorPartOneBox}>

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
        </Box>
    )
}