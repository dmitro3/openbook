import {TeamCard } from '@components/Betting/Sportbook/TeamCard';
import {BetButton} from '@components/Betting/Sportbook/BetButton';
import {FavoriteButton} from '@components/Betting/Sportbook/FavoriteButton';
const static_english_soccer_icons_path = "/static/images/team_and_player_icons/";
import {useState, useEffect, useRef} from "react"

// Redux Dependencies
import {connect} from "react-redux";
import {addFavoriteMatch,removeFavoriteMatch} from "redux/actions/favoriteMatchActions";
import {addBetSlipOutcome,removeBetSlipOutcome} from 'redux/actions/betSlipActions';
import {setBetSlipOpen,setFirstTimeBetButtonClicked} from "redux/actions/settingsActions";
import {FeatureMatchCard,FeatureMatchCardContent,FeatureMatchCardGrid,FeatureMatchCardGridItemTeam,FeatureMatchCardGridItemTimeDate,FeatureMatchCardTypographyTimeDate,FeatureMatchCardButtonsBox} from './FeaturePageStyle'

const FeaturedMatchCard = (props) => {
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
  return(
    <FeatureMatchCard>
      <FeatureMatchCardContent>
        <FeatureMatchCardGrid
          container
          spacing={3}
        >
          <FeatureMatchCardGridItemTeam item>
            <TeamCard teamName={props.match1} teamIconPath={static_english_soccer_icons_path + props.match1 + ".png"}/>
          </FeatureMatchCardGridItemTeam>

          <FeatureMatchCardGridItemTimeDate item>
                <FeatureMatchCardTypographyTimeDate s="green">{props.dateString}</FeatureMatchCardTypographyTimeDate>
                <FeatureMatchCardTypographyTimeDate>{props.timeString}</FeatureMatchCardTypographyTimeDate>
          </FeatureMatchCardGridItemTimeDate>       
          
          <FeatureMatchCardGridItemTeam item>
            <TeamCard teamName={props.match2} teamIconPath={static_english_soccer_icons_path + props.match2 + ".png"}/>
          </FeatureMatchCardGridItemTeam>
        
        <FeatureMatchCardButtonsBox>
        {
          Object.keys(props.outcomes).map( (item,index) => {
            let outcomeKey = item.toString();
            let outcomeValue = ""
            let order = null;
            if(outcomeKey == 'X'){
              order = 1
            }
            else{
              order = Number(outcomeKey);
            }
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
            order={order ? order : index}
            firstTimeBetButtonClicked= {props.settings.firstTimeBetButtonClicked}
            setBetSlipOpen={props.setBetSlipOpen}
            setFirstTimeBetButtonClicked={props.setFirstTimeBetButtonClicked}
            oddsChange={betButtonOddsState[index]}
            />)
        })}
          <FavoriteButton FaviorteButtonId={props.matchId} addFavoriteMatch={props.addFavoriteMatch} removeFavoriteMatch={props.removeFavoriteMatch} favorited={props.favoriteMatch.favoritedMatchArray.includes(props.matchId)}/>
        </FeatureMatchCardButtonsBox>  
        </FeatureMatchCardGrid>
      </FeatureMatchCardContent>
    </FeatureMatchCard>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedMatchCard);
