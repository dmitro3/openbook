import {Box,Typography,Button} from "@mui/material"

export const HeroBanner = () => {

    return(
        <Box style={{"backgroundColor":"#2c87ef","padding":"3.5rem","borderRadius":"10px","position":"relative",marginTop:'50px',width:'95%',marginLeft:'auto',marginRight:'auto',paddingLeft:'3%'}}>
        <Box style={{"width":"50%","maxWidth":"350px","position":"absolute","overflow":"hidden","height":"calc(110%)","top":"-10%","right":"3rem","display":"block"}}>
            <img style={{"width":"100%","height":"auto"}} alt="" src="https://www.futwiz.com/assets/img/fifa21/faces/117598535.png"/>
        </Box>
        <Typography style={{"display":"flex","justifyContent":"space-between","alignItems":"center","fontSize":"2rem",color:'white'}}>
        Bet less and win more
        </Typography>
         <Typography style={{"color":"rgba(255, 255, 255, 0.8)","fontWeight":"300","lineHeight":"1.7","marginTop":"0","maxWidth":"58%",marginBottom:'10px',marginTop:'20px',fontSize:"20px"}}>
         Pay less fees when betting and gain more with other bets by becoming a bookie yourself. 
        </Typography>       
        <Button 
        sx={{"display":"inline-block","padding":"1rem 2rem","lineHeight":"2","border":"0","backgroundColor":"white","borderRadius":"7px","fontWeight":"500","color":"#2c87ef","textDecoration":"none","textAlign":"center","cursor":"pointer","transition":"transform 0.3s, box-shadow 0.3s","paddingLeft":"3rem","paddingRight":"3rem","textTransform":"uppercase","fontSize":"0.875rem",marginTop:'10px',
        '&:hover': {
            transform: "translateY(-0.25em)",
            backgroundColor:'white',
            color:"#2c87ef"
        },
        }}>
        More details
        </Button>
        </Box>
    )
}