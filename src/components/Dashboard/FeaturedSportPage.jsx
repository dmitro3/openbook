import {Box,Typography} from "@mui/material"
import CustomSwiperForFeatureRows from "./CustomSwiperForFeatureRows"


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
                    <CustomSwiperForFeatureRows league_data={league.slice(0,5)} sport_key={key} league_name={leagues_keys[index2]}/>           
                    </div>)
                }
                return returnComponent;
        })
    })}

    <style>{`
    .featured-sport-page{
            height: 100%;
            width: 97%;
            -webkit-transition: width 0.5s ;
            -moz-transition: width 0.5s ;
            -o-transition: width 0.5s ;
            transition: width 0.5s ;
        }
    .featured-sport-page-narrow{
        width: calc(100% - 350px);
    }
    .featured-sport-page-full{
        width:97%;
    }
    `}</style>
    </Box>
)
}

