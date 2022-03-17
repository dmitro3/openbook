import {Box,Typography} from "@mui/material"
import CustomSwiperForFeatureRows from "./CustomSwiperForFeatureRows"
import _JSXStyle from 'styled-jsx/style'

export const FeaturedSportPage = (props) => {
    let data = props.data
    let sport_keys = Object.keys(props.data);

return (
    <Box className={`featured-sport-page ${props.isSlipOpened ? "featured-sport-page-narrow" : "featured-sport-page-full"}`}>
    
    {sport_keys.map((key,index)=>{
        let leagues = Object.values(data[key]);
        let leagues_keys = Object.keys(data[key]);
        return leagues.map((league,index2)=>{
            let returnComponent = <div key={index2}></div>
                if(league.length != 0){
                    returnComponent = (
                    <div key={index2}>
                    <Typography  sx={{marginLeft:'20px',paddingTop:'30px',paddingBottom:'20px',fontSize:'17px', fontWeight:'500'}}>{`${key} / ${leagues_keys[index2]}`}</Typography>
                    <CustomSwiperForFeatureRows league_data={league.slice(0,5)}/>           
                    </div>)
                }
                return returnComponent;
        })
    })}

    <_JSXStyle>{`
    .featured-sport-page{
            height: 100%;
            width: 100%;
            -webkit-transition: width 0.5s ;
            -moz-transition: width 0.5s ;
            -o-transition: width 0.5s ;
            transition: width 0.5s ;
        }
    .featured-sport-page-narrow{
        width: calc(100% - 350px);
    }
    .featured-sport-page-full{
        width:100%;
    }
    `}</_JSXStyle>
    </Box>
)
}

