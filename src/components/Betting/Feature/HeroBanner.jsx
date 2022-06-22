import {Box,Typography,Button} from "@mui/material"
import { styled, experimental_sx as sx } from '@mui/system';

export const HeroBannerBox = styled(Box)((props)  => sx({
    backgroundImage: "linear-gradient(to bottom, #000428, #004e92)",
    "padding":"3.5rem",
    "borderRadius":"10px",
    "position":"relative",
    marginTop:'50px',
    width:'95%',
    marginLeft:'auto',
    marginRight:'auto',   
    [props.theme.breakpoints.down("md")]: {
        "padding":"2.5rem",
    },
    [props.theme.breakpoints.down("sm")]: {
        "padding":"1.5rem",
        marginTop:'40px',
    },
}));

export const HeroBannerImgFirstFloatingCoin = styled("img")((props)  => sx({
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    "left":"40%",
    "animation":"spin 30s linear infinite",
    "position":"absolute",
    "height":"30%",
    "bottom":"10%",
    [props.theme.breakpoints.down("lg")]: {
        "left":"40%",
    },
    [props.theme.breakpoints.down("md")]: {
        "left":"60%",
    },
    [props.theme.breakpoints.down("sm")]: {
        display: "none"
    },
}));

export const HeroBannerImgSecondFloatingCoin = styled("img")((props)  => sx({
    "left":"30%",
    "bottom":"62%",
    "animation":"spin 30s linear infinite",
    "position":"absolute",
    [props.theme.breakpoints.down("lg")]: {
        "left":"90%",
    },
    [props.theme.breakpoints.down("md")]: {
        "left":"85%",
    },
    [props.theme.breakpoints.down("sm")]: {
        display: "none"
    },
}));

export const HeroBannerImgFirstFloatingCup = styled("img")((props)  => sx({
    "@keyframes rippleAni":{
        "0%": {
            transform: "translate(0px, 0px)"
        },
        "33%": {
            transform: "translate(5px, -5px)"
        },
        "66%": {
            transform: "translate(-5px, 5px)"
        },
        "100%": {
            transform: "translate(0px, 0px)"
        }
    },
    "right":"30%",
    "bottom":"calc(20%)",
    "animation":"rippleAni 3.5s linear infinite",
    "position":"absolute",
    [props.theme.breakpoints.down("md")]: {
        display: "none"
    },
}));

export const HeroBannerAvatarBox = styled(Box)((props)  => sx({
    "width":"50%",
    "maxWidth":"350px",
    "position":"absolute",
    "overflow":"hidden",
    "height":"calc(110%)",
    "top":"-10%",
    "right":"3rem",
    "display":"block",
    [props.theme.breakpoints.down("md")]: {
        "display":"none"
    },
}));

export const HeroBannerAvatarImg = styled("img")((props)  => sx({
    "width":"100%",
    "height":"auto"
}));

export const HeroBannerTitleTypography = styled(Typography)((props)  => sx({
    "display":"flex",
    "justifyContent":"space-between",
    "alignItems":"center",
    "fontSize":"2rem",
    color:'white',
    [props.theme.breakpoints.down("sm")]: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize:"28px",
        fontWeight: "bold"
    },
}));

export const HeroBannerParagraphTypography = styled(Typography)((props)  => sx({
    "color":"rgba(255, 255, 255, 0.8)",
    "fontWeight":"300",
    "lineHeight":"1.7",
    "marginTop":"0",
    "maxWidth":"58%",
    marginBottom:'10px',
    marginTop:'20px',
    fontSize:"20px",
    [props.theme.breakpoints.down("md")]: {
        "maxWidth":"100%",
    },
    [props.theme.breakpoints.down("sm")]: {
        textAlign: 'center',
        fontSize:"18px",
        marginBottom : "30px"
    },
}));

export const HeroBannerButtonBox = styled(Box)((props)  => sx({
    display: "flex"
}));

export const HeroBannerButton = styled(Button)((props)  => sx({
    "display":"inline-block",
    "padding":"1rem 2rem",
    "lineHeight":"2",
    "border":"0",
    "backgroundColor":"white",
    "borderRadius":"7px",
    "fontWeight":"500",
    "color":"#2c87ef",
    "textDecoration":"none",
    "textAlign":"center",
    "cursor":"pointer",
    "transition":"transform 0.3s, box-shadow 0.3s",
    "paddingLeft":"3rem",
    "paddingRight":"3rem",
    "textTransform":"uppercase",
    "fontSize":"0.875rem",
    marginTop:'10px',
    '&:hover': {
        transform: "translateY(-0.25em)",
        backgroundColor:'white',
        color:"#2c87ef"
    },
    [props.theme.breakpoints.down("sm")]: {
        textAlign: 'center',
        margin: "0 auto"
    },
}));

export const HeroBanner = () => {
    return(
        <HeroBannerBox>
        <HeroBannerImgFirstFloatingCoin src="https://pixner.net/bitbetio/main/assets/images/coin-4.png" alt="floating coin 1"/>
        <HeroBannerImgSecondFloatingCoin src="https://pixner.net/bitbetio/main/assets/images/coin-1.png" alt="floating coin 2" />
        <HeroBannerImgFirstFloatingCup src="https://pixner.net/bitbetio/main/assets/images/winner-cup.png" alt="floating cup 1"/>

        <HeroBannerAvatarBox>
            <HeroBannerAvatarImg alt="Leonardo Messi" src="https://www.futwiz.com/assets/img/fifa21/faces/117598535.png"/>
        </HeroBannerAvatarBox>
        <HeroBannerTitleTypography>
        Bet less and win more
        </HeroBannerTitleTypography>
         <HeroBannerParagraphTypography>
         Pay less fees when betting and gain more when others bet by becoming a bookie yourself. 
        </HeroBannerParagraphTypography>       
        <HeroBannerButtonBox>
            <HeroBannerButton>
            More details
            </HeroBannerButton>
        </HeroBannerButtonBox>

        </HeroBannerBox>
    )
}