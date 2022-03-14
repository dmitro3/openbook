import {Card, CardContent, Grid, Typography,Box} from '@mui/material';
import PropTypes from "prop-types";
import {TeamCard } from '@components/Dashboard/TeamCard';
import {BetButton} from '@components/Dashboard/BetButton';
import {FavoriteButton} from '@components/Dashboard/FavoriteButton';
const static_english_soccer_icons_path = "/../public/static/images/english_soccer_team_icons/";

// Redux Dependencies
import {connect} from "react-redux";
import {addFavoriteMatch,removeFavoriteMatch} from "@actions/favoriteMatchActions";
import {addBetSlipOutcome,removeBetSlipOutcome} from '@actions/betSlipActions';

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
        <Grid item style={{paddingLeft:'0px',width:'30%'}}>
          <TeamCard teamName={props.match1} teamIconPath={static_english_soccer_icons_path + props.match1 + ".png"}/>
        </Grid>

        <Grid item 
        style={{marginLeft:'auto',marginRight:'auto',marginTop:'30px',textAlign:'center',paddingLeft:'0px'}}>
              <Typography>{props.dateString}</Typography>
              <Typography>{props.timeString}</Typography>
        </Grid>       
        
        <Grid item style={{paddingLeft:'0px',width:'30%'}}>
          <TeamCard teamName={props.match2} teamIconPath={static_english_soccer_icons_path + props.match2 + ".png"}/>
        </Grid>
      
      <Box sx={{display:"flex",alignItems: "center", justifyContent: "center",position:'absolute',bottom:'7%',left:'10%',right:'10%'}}>
      {
        Object.keys(props.outcomes).map( item => {
          let outcomeKey = item.toString();
          let outcomeValue = props.outcomes[item].toString();
          return(
          <BetButton
          key={outcomeKey}
          number={outcomeKey} 
          outcome={Number(outcomeValue).toFixed(2).toString()}
          BetButtonId={props.matchId+"/"+outcomeKey}
          addBetSlipMatch={props.addBetSlipMatch}
          removeBetSlipOutcome={props.removeBetSlipOutcome}
          inSlip={props.betSlip.betSlipOutcomeArray.includes(props.matchId+"/"+outcomeKey)}
          />)
      })}
        <FavoriteButton FaviorteButtonId={props.matchId} addFavoriteMatch={props.addFavoriteMatch} removeFavoriteMatch={props.removeFavoriteMatch} favorited={props.favoriteMatch.favoritedMatchArray.includes(props.matchId)}/>
      </Box>  
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
  match1:PropTypes.string,
  match2:PropTypes.string,
  outcomes:PropTypes.object,
  dateString:PropTypes.string,
  timeString:PropTypes.string,
  matchid: PropTypes.string,
};



export default connect(mapStateToProps, mapDispatchToProps)(MatchCard);
