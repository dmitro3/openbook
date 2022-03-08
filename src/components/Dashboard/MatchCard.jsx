import {Card, CardContent, Grid, Typography, Button} from '@mui/material';
import PropTypes from "prop-types";
import {TeamCard } from './TeamCard';
import {BetButton} from './BetButton';
import {FavoriteButton} from './FavoriteButton';
const static_english_soccer_icons_path = "/../public/static/images/english_soccer_team_icons/";


export const MatchCard = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent style={{height:"100%",position:'relative',paddingBottom:'100px'}}>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between', width:"100%",marginLeft:'0px',marginRight:'0px',marginTop:'0px',paddingTop:"24px"}}
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
        outcome={props.outcome1}/>

        <BetButton number={'X'} 
        outcome={props.outcomeX}/>
        
        <BetButton number={'2'} 
        outcome={props.outcome2}/>
        <FavoriteButton/>
      </div>  
      </Grid>
    </CardContent>
  </Card>
);

MatchCard.propTypes = {
  team1:PropTypes.string,
  team2:PropTypes.string,
  outcome1:PropTypes.number,
  outcomeX:PropTypes.number,
  outcome2:PropTypes.number,
  dateString:PropTypes.string,
  timeString:PropTypes.string
};
