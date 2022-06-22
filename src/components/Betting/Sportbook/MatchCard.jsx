import {TeamCard } from '@components/Betting/Sportbook/TeamCard';
import {BetButton} from '@components/Betting/Sportbook/BetButton';
import {FavoriteButton} from '@components/Betting/Sportbook/FavoriteButton';
const static_english_soccer_icons_path = "/static/images/team_and_player_icons/";
import {useState, useEffect, useRef} from "react";
import {MatchCardCard,MatchCardCardContent,MatchCardGridContainer,MatchCardGridItem,MatchCardGridItem2,MatchCardTypographyDateTime,MatchCardButtonsBox} from './SportbookStyle';

// Redux Dependencies
import {connect} from "react-redux";
import {addFavoriteMatch,removeFavoriteMatch} from "redux/actions/favoriteMatchActions";
import {addBetSlipOutcome,removeBetSlipOutcome} from 'redux/actions/betSlipActions';
import {setBetSlipOpen,setFirstTimeBetButtonClicked} from "redux/actions/settingsActions";





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
        <MatchCardGridContainer container spacing={3}>
          <MatchCardGridItem item>
            <TeamCard teamName={props.match1} teamIconPath={static_english_soccer_icons_path + props.match1 + ".png"}/>
          </MatchCardGridItem>

          <MatchCardGridItem2 item>
                <MatchCardTypographyDateTime>{props.dateString}</MatchCardTypographyDateTime>
                <MatchCardTypographyDateTime>{props.timeString}</MatchCardTypographyDateTime>
          </MatchCardGridItem2>       
          
          <MatchCardGridItem item>
            <TeamCard teamName={props.match2} teamIconPath={static_english_soccer_icons_path + props.match2 + ".png"}/>
          </MatchCardGridItem>
        
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
        </MatchCardGridContainer>
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
