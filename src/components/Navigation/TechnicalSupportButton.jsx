import {Box,Typography,Button} from "@mui/material"
import {useRouter} from 'next/router'
import { styled, experimental_sx as sx } from '@mui/system';

export const TechnicalSupportButtonBox = styled(Box)((props)=> sx({
    "padding":"2rem 1.5rem",
    position:'fixed',
    right:'1vw',
    bottom:'1vh',
    zIndex: 100
}))

export const TechnicalSupportButtonButton = styled(Button)((props)=> sx({
    backgroundColor:"white",
    "width":"100%",
    "display":"flex",
    "alignItems":"center",
    "justifyContent":"space-around",
    "fontWeight":"normal",
    "fontSize":"1.15rem",
    "borderRadius":"2.5rem",
    "paddingTop":"1rem",
    "paddingBottom":"1rem",
    "boxShadow":"1px 2px 2px rgb(65 24 219 / 10%)",
    "padding":"0.6rem 0.8rem",
    "transition":"transform 0.3s, box-shadow 0.3s",
    '&:hover': {
        transform: "translateY(-0.25em)",
        backgroundColor:'white',
    },
    '&:after': {
        'content': '"Technical Support"'
    },
    [props.theme.breakpoints.down("sm")]: {
        '&:after': {
            'content': '""',
            display:'none'
        },

    },
}))

export const TechnicalSupportButtonSvg = styled('svg')((props)=> sx({
    marginRight:"10px",
    [props.theme.breakpoints.down("sm")]: {
        marginRight:"0px",
    }
}))

export const TechnicalSupportButton = () => {
    const router = useRouter()
    return (
        <TechnicalSupportButtonBox>
            <TechnicalSupportButtonButton onClick={()=>{router.push('/support')}}>
            <TechnicalSupportButtonSvg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H19V21H12V23H18A3,3 0 0,0 21,20V10C21,5 16.97,1 12,1Z">
                </path>
            </TechnicalSupportButtonSvg>
            </TechnicalSupportButtonButton>
        </TechnicalSupportButtonBox>
    )
}