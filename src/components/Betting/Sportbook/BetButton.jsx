import {useEffect, useState} from "react"
import {BetButtonStyle,BetButtonNumber,BetButtonOdds,BetButtonTriangleUp,BetButtonTriangleDown,BetButtonSpace,BetButtonDiv} from "./SportbookStyle"

export const BetButton = (props) => {
    const [oddsChange,setOddsChange] = useState("normal");

    const oddsGoUp =  () => {
        setOddsChange("oddsUp")
        setTimeout(()=>{
            setOddsChange("normal")
        },4000)
    }

    const oddsGoDown = () =>{
        setOddsChange("oddsDown")
        setTimeout(()=>{
            setOddsChange("normal")
        },4000)
    }

    useEffect(()=>{
        if(props.oddsChange == "normal"){
        }
        else if(props.oddsChange == "oddsUp"){
            oddsGoUp()
        }
        else if(props.oddsChange == "oddsDown"){
            oddsGoDown()
        }
    },[props.oddsChange])


    function betButtonClicked(e){
        props.inSlip ? props.removeBetSlipOutcome(props.BetButtonId) : props.addBetSlipMatch(props.BetButtonId);
        if(!props.firstTimeBetButtonClicked){
            props.setFirstTimeBetButtonClicked(true);
            props.setBetSlipOpen(true);
        }
    }

    return(
        <BetButtonStyle
        variant="body2"
        id={props.BetButtonId}
        onClick={(e)=>betButtonClicked(e)}
        inslip = {props.inSlip ? 1 : 0}
        >
        
            <BetButtonNumber>{props.number}</BetButtonNumber>
            <BetButtonSpace style={{padding:'0.5vw'}}></BetButtonSpace>
            <BetButtonDiv style={{position:'relative'}}>
                <BetButtonOdds oddschanging={"none"} >{props.outcome}</BetButtonOdds>
                <BetButtonTriangleUp /*oddschanging*//>
                <BetButtonTriangleDown /*oddschanging*//>
            </BetButtonDiv>

        </BetButtonStyle>
)};