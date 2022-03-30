import {Typography, Button, Box} from '@mui/material';
import PropTypes from "prop-types";
import {GoTriangleUp,GoTriangleDown} from 'react-icons/go'
import {useState} from "react"

export const BetButton = (props) => {
    const [oddsChange,setOddsChange] = useState("normal");

    const oddsGoUp =  () => {
        setOddsChange("oddsUp")
        setTimeout(()=>{
            setOddsChange("normal")
        },2000)
    }

    const oddsGoDown = () =>{
        setOddsChange("oddsDown")
        setTimeout(()=>{
            setOddsChange("normal")
        },2000)
    }

    let oddsTextStyle = "odds-normal-text"
    let oddsIncreaseTriangleStyle = "odds-increase-triangle"
    let oddsDecreaseTriangleStyle = "odds-decrease-triangle"
    switch(oddsChange){
        case "normal":
            oddsTextStyle = "odds-normal-text"
            oddsIncreaseTriangleStyle = "odds-increase-triangle"
            oddsDecreaseTriangleStyle = "odds-decrease-triangle"
        break;

        case "oddsUp":
            oddsTextStyle = "odds-normal-text odds-go-up-text"
            oddsIncreaseTriangleStyle = "odds-increase-triangle odds-change-tirangle-show-up"
        break;

        case "oddsDown":
            oddsTextStyle = "odds-normal-text odds-go-down-text" 
            oddsDecreaseTriangleStyle = "odds-decrease-triangle odds-change-tirangle-show-up"
        break;

        default:
            oddsTextStyle = "odds-normal-text"
            oddsIncreaseTriangleStyle = "odds-increase-triangle"
            oddsDecreaseTriangleStyle = "odds-decrease-triangle"
        break;
    }
    

    return(
        <Button
        sx={{
            mr: 1,
            px: 1.5,
            py: 2,
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#d9d9d9'
            },
            '*':{
            pointerEvents: 'none'
            }
            }}
        variant="body2"
        id={props.BetButtonId}
        // onClick={(e)=>{props.inSlip ? props.removeBetSlipOutcome(props.BetButtonId) : props.addBetSlipMatch(props.BetButtonId)}}
        onClick={(e)=>{
            Math.random() > 0.5 ? oddsGoUp(): oddsGoDown();
        }}
        style={props.inSlip? {border:'2px solid black'} : { border:'none'}}
        >
        
            <Typography sx={{mr:'auto'}}>{props.number}</Typography>
            <div style={{padding:'0.5vw'}}></div>
            <div style={{position:'relative'}}>
            <Typography className={oddsTextStyle}>{props.outcome}</Typography>
            <GoTriangleUp className={oddsIncreaseTriangleStyle}/>
            <GoTriangleDown className={oddsDecreaseTriangleStyle}/>

            <style>
                {`
                    .odds-increase-triangle{
                        position:absolute;
                        top:20px;
                        left:20%;
                        color: green;
                        visibility: hidden;
                    }

                    .odds-decrease-triangle{
                        position:absolute;
                        top:20px;
                        left:20%;
                        color: red;
                        visibility: hidden;
                    }

                    .odds-change-tirangle-show-up{
                        visibility: visible;
                    }

                    .odds-normal-text{
                        margin-left:auto;
                        color: #005a98;
                    }

                    .odds-go-down-text{
                        color: red;
                        font-weight: 500;
                    }

                    .odds-go-up-text{
                        color: green;
                        font-weight: 500;
                    }

                `}
            </style>
            </div>

        </Button>
)};

BetButton.propTypes = {
    number:PropTypes.string,
    outcome:PropTypes.string,
    BetButtonId: PropTypes.string,
    inSlip: PropTypes.bool
};