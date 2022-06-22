import {RiStarLine,RiStarFill} from 'react-icons/ri';
import {FavoriteButtonStyle} from "./SportbookStyle"

export const FavoriteButton = (props) => {  
    return (
        <FavoriteButtonStyle
            variant="body2"
            id={props.FaviorteButtonId}
            onClick={(e)=>{props.favorited ? props.removeFavoriteMatch(props.FaviorteButtonId) : props.addFavoriteMatch(props.FaviorteButtonId)}}
            >
            {props.favorited ? <RiStarFill style={{color:'#ffdb28d1'}}/> : <RiStarLine/>}
        </FavoriteButtonStyle>
    
    )
};