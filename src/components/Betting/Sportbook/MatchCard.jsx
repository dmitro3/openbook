import {TeamCard } from '@components/Betting/Sportbook/TeamCard';
import {BetButton} from '@components/Betting/Sportbook/BetButton';
import {FavoriteButton} from '@components/Betting/Sportbook/FavoriteButton';
const static_english_soccer_icons_path = "/static/images/team_and_player_icons/";
import {useState, useEffect, useRef} from "react";
// import {MatchCardCard,MatchCardCardContent,MatchCardGridContainer,MatchCardGridItem,MatchCardGridItem2,MatchCardTypographyDateTime,MatchCardButtonsBox} from './SportbookStyle';
import { Avatar, Typography, Button, Card, CardContent, Grid, Box} from '@mui/material';
import { styled, experimental_sx as sx } from '@mui/system';

// Redux Dependencies
import {connect} from "react-redux";
import {addFavoriteMatch,removeFavoriteMatch} from "redux/actions/favoriteMatchActions";
import {addBetSlipOutcome,removeBetSlipOutcome} from 'redux/actions/betSlipActions';
import {setBetSlipOpen,setFirstTimeBetButtonClicked} from "redux/actions/settingsActions";



export const MatchCardCard = styled(Card)((props)  => sx({
  height: '230px',
  backgroundColor: props.theme.palette.background.paper
}));

export const MatchCardCardContent = styled(CardContent)((props)  => sx({
  height:"100%",
  position:'relative',
  py:'15px !important', 
  px:'8px !important', 
}));

export const MatchCardTopBox = styled(Box)((props)  => sx({
  width:"100%",
  margin:'0px',
  display:'flex',
}));

export const MatchCardTopTeamCardBox = styled(Box)((props)  => sx({
  padding:'0px',
  width:'35%',
}));

export const MatchCardDateTimeBox = styled(Box)((props)  => sx({
  textAlign:'center',
  paddingLeft:'0px',
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  alignContent: "center",
  width: "30%"
}));

export const MatchCardTypographyDateTime1 = styled(Typography)((props)  => sx({
  paddingLeft:'0px',
  width:'100%',
  paddingTop: '0px'
}));

export const MatchCardTypographyDateTime2 = styled(Typography)((props)  => sx({
  paddingLeft:'0px',
  width:'100%',
  paddingTop: '20px'
}));

export const MatchCardButtonsBox = styled(Box)((props)  => sx({
  display:"flex",
  alignItems: "center", 
  justifyContent: "center",
  position: "absolute",
  bottom: "7%",
  left: "5%",
  right: "5%"
}));

const MatchCard = (props) => {
  const [betButtonOddsState,setBetButtonOddsState] = useState(['normal','normal']);
  const prevOutcome = useRef()
  useEffect(()=>{
      prevOutcome.current = props.outcomes;
      if(props.odds.oddsChanging.includes(String(props.matchId))){
        console.log(props.odds.oddsChanging)
        let oldOdds = Object.values(prevOutcome.current);
        let newOdds = props.odds.newOdds;
        if(oldOdds[0] != newOdds[0] && oldOdds[1] != newOdds[1]){
          if(oldOdds[0] > newOdds[0]){
            setBetButtonOddsState(["oddsUp","oddsDown"])
          }
          else{
            setBetButtonOddsState(["oddsDown","oddsUp"])
          }
        }
      }
      else{
        setBetButtonOddsState(["normal","normal"])
      }
    },[props.odds.oddsChanging])


  return (
    <MatchCardCard>
      <MatchCardCardContent>
        <MatchCardTopBox>
          <MatchCardTopTeamCardBox>
            <TeamCard teamName={props.match1} teamIconPath={static_english_soccer_icons_path + props.match1 + ".png"}/>
          </MatchCardTopTeamCardBox>

          <MatchCardDateTimeBox>
                <MatchCardTypographyDateTime1>{props.dateString}</MatchCardTypographyDateTime1>
                <MatchCardTypographyDateTime2>{props.timeString}</MatchCardTypographyDateTime2>
          </MatchCardDateTimeBox>       
          
          <MatchCardTopTeamCardBox item>
            <TeamCard teamName={props.match2} teamIconPath={static_english_soccer_icons_path + props.match2 + ".png"}/>
          </MatchCardTopTeamCardBox>
        </MatchCardTopBox>  

        <MatchCardButtonsBox>
        {
          Object.keys(props.outcomes).map( (item,index )=> {
            let outcomeKey = item.toString();
            let outcomeValue = ""
            switch(props.settings.oddsFormat){
              case "decimal":
                outcomeValue = Number(props.outcomes[item]).toFixed(2).toString();
                break;
              case "american":
                outcomeValue = Number(props.outcomesInUS[item]).toFixed(0).toString();
                break;
              case "percentage":
                outcomeValue = `${(Number(props.outcomesInProb[item])*100).toFixed(1).toString()}%`;
                break;
              default:
                outcomeValue = props.outcomes[item].toString();
            }
            
            return(
            <BetButton
            key={outcomeKey}
            number={outcomeKey} 
            outcome={outcomeValue}
            BetButtonId={props.matchId+"/"+outcomeKey}
            addBetSlipMatch={props.addBetSlipMatch}
            removeBetSlipOutcome={props.removeBetSlipOutcome}
            inSlip={props.betSlip.betSlipOutcomeArray.includes(props.matchId+"/"+outcomeKey)}
            oddsChange={betButtonOddsState[index]}
            firstTimeBetButtonClicked= {props.settings.firstTimeBetButtonClicked}
            setBetSlipOpen={props.setBetSlipOpen}
            setFirstTimeBetButtonClicked={props.setFirstTimeBetButtonClicked}
            />)
        })}
          <FavoriteButton FaviorteButtonId={props.matchId} addFavoriteMatch={props.addFavoriteMatch} removeFavoriteMatch={props.removeFavoriteMatch} favorited={props.favoriteMatch.favoritedMatchArray.includes(props.matchId)}/>
        </MatchCardButtonsBox>  

      </MatchCardCardContent>
    </MatchCardCard>
  );
}

const mapStateToProps = (state) => {
  return {
      favoriteMatch: state.favoriteMatch,
      betSlip: state.betSlip,
      settings: state.settings,
      odds: state.odds
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addFavoriteMatch: (matchId) => {
        dispatch(addFavoriteMatch(matchId));
        },
      removeFavoriteMatch: (matchId) => {
        dispatch(removeFavoriteMatch(matchId));
      },
      addBetSlipMatch: (outcomeID) => {
        dispatch(addBetSlipOutcome(outcomeID));
      },
      removeBetSlipOutcome: (outcomeID) => {
        dispatch(removeBetSlipOutcome(outcomeID));
      },
      setBetSlipOpen: (open) => {
        dispatch(setBetSlipOpen(open));
      },
      setFirstTimeBetButtonClicked: (clicked) => {
        dispatch(setFirstTimeBetButtonClicked(clicked));
      },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchCard);
