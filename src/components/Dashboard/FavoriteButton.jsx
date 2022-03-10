import {Button} from '@mui/material';
import {RiStarLine} from 'react-icons/ri';
import PropTypes from "prop-types";

export const FavoriteButton = (props) => (
    <Button
    sx={{
        mr: 1,
        padding: '1rem',
        backgroundColor: "#f5f5f5",
        fontSize: '1.2rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#d9d9d9'
        },
        '*':{
            pointerEvents: 'none'
        }
    }}
    variant="body2"
    id={props.FaviorteButtonId}
    onClick={(e)=>{e.target.id ? console.log(e.target.id) : void(0)}}>
    <RiStarLine/>
    </Button>
);

FavoriteButton.propTypes = {
    FaviorteButtonId: PropTypes.string
};