import {Box,Typography} from "@mui/material"
import CustomSwiperForFeatureRows from "./CustomSwiperForFeatureRows"

export const FeaturedSportPage = () => {
return (
    <Box sx={{height:'100%',width:'100%',backgroundColor:'green'}}>
    <Typography sx={{marginLeft:'20px',paddingTop:'30px',paddingBottom:'20px',fontSize:'17px', fontWeight:'500'}}>Soccer</Typography>
    <CustomSwiperForFeatureRows/>
    <Typography sx={{marginLeft:'20px',paddingTop:'30px',paddingBottom:'20px',fontSize:'17px', fontWeight:'500'}}>Tennis</Typography>

    <Typography sx={{marginLeft:'20px',paddingTop:'30px',paddingBottom:'20px',fontSize:'17px', fontWeight:'500'}}>Boxing</Typography>

    </Box>
)
}

