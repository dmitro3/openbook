import {Card, CardContent, Grid, Typography, Button} from '@mui/material';
import PropTypes from "prop-types";
import {TeamCard } from './TeamCard';
import {BetButton} from './BetButton';
import {FavoriteButton} from './FavoriteButton';
const static_english_soccer_icons_path = "/../public/static/images/english_soccer_team_icons/";

// Redux Dependencies
import {connect} from "react-redux";
import {addFavoriteMatch,removeFavoriteMatch} from "../../actions/favoriteMatchActions";
import {addBetSlipOutcome,removeBetSlipOutcome} from '../../actions/betSlipActions';

const MatchCard = (props) => (
  <Card
    sx={{ height: '100%' }}
  >
    <CardContent style={{height:"100%",position:'relative',paddingBottom:'100px', marginTop:'0px'}}>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between', width:"100%",marginLeft:'0px',marginRight:'0px',marginTop:'0px'}}
      >
        <Grid item 
        style={{paddingLeft:'0px',width:'30%'}}
         >
          <TeamCard teamName={props.team1} 
          teamIconPath={static_english_soccer_icons_path + props.team1 + ".png"}/>
        </Grid>

        <Grid item 
        style={{marginLeft:'auto',marginRight:'auto',marginTop:'30px',textAlign:'center',paddingLeft:'0px'}}>
              <Typography>{props.dateString}</Typography>
              <Typography>{props.timeString}</Typography>
        </Grid>       
        
        <Grid item 
        style={{paddingLeft:'0px',width:'30%'}}>
          <TeamCard teamName={props.team2} 
          teamIconPath={static_english_soccer_icons_path + props.team2 + ".png"}/>
        </Grid>
      
      <div style={{display:"flex",alignItems: "center", justifyContent: "center",position:'absolute',bottom:'7%',left:'10%',right:'10%'}}>
        <BetButton number={'1'} 
        outcome={props.outcome1}
        BetButtonId={props.matchId+"/"+"1"}
        addBetSlipMatch={props.addBetSlipMatch}
        removeBetSlipOutcome={props.removeBetSlipOutcome}
        inSlip={props.betSlip.betSlipOutcomeArray.includes(props.matchId+"/"+"1")}
        />

        <BetButton number={'X'} 
        outcome={props.outcomeX}
        BetButtonId={props.matchId+"/"+"X"}
        addBetSlipMatch={props.addBetSlipMatch}
        removeBetSlipOutcome={props.removeBetSlipOutcome}
        inSlip={props.betSlip.betSlipOutcomeArray.includes(props.matchId+"/"+"X")}
        />
        
        <BetButton number={'2'} 
        outcome={props.outcome2}
        BetButtonId={props.matchId+"/"+"2"}
        addBetSlipMatch={props.addBetSlipMatch}
        removeBetSlipOutcome={props.removeBetSlipOutcome}
        inSlip={props.betSlip.betSlipOutcomeArray.includes(props.matchId+"/"+"2")}
        />
        <FavoriteButton FaviorteButtonId={props.matchId} addFavoriteMatch={props.addFavoriteMatch} removeFavoriteMatch={props.removeFavoriteMatch} favorited={props.favoriteMatch.favoritedMatchArray.includes(props.matchId)}/>
      </div>  
      </Grid>
    </CardContent>
  </Card>
);

const mapStateToProps = (state) => {
  return {
      favoriteMatch: state.favoriteMatch,
      betSlip: state.betSlip
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
      }
    };
};

MatchCard.propTypes = {
  team1:PropTypes.string,
  team2:PropTypes.string,
  outcome1:PropTypes.string,
  outcomeX:PropTypes.string,
  outcome2:PropTypes.string,
  dateString:PropTypes.string,
  timeString:PropTypes.string,
  matchid: PropTypes.string,
};



export default connect(mapStateToProps, mapDispatchToProps)(MatchCard);
