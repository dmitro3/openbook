import { Container, Grid } from "@mui/material";
import MatchCard from "./MatchCard";
import PropTypes from "prop-types";

export const SportsBookPage = (props) => {
    let EPL_data = props.EPL_data;
    
    let sportsBookPage =  (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                {
                    EPL_data.map((match) => {
                    let datetime = new Date(match.timestamp);
                    let dateStringForProps=datetime.toLocaleString('default', { month: 'short', day:'numeric' })
                    let timeStringForProps=datetime.toLocaleString('default', { hour: 'numeric', minute:'numeric',  hourCycle: 'h23' })
                    return  (
                            <Grid key={match.id} item lg={6} sm={12} xl={4} xs={12}>
                                <MatchCard 
                                team1={match.match[0]} 
                                team2={match.match[1]} 
                                outcome1={match.outcomes['1'].toFixed(2)} 
                                outcomeX={match.outcomes['X'].toFixed(2)} 
                                outcome2={match.outcomes['2'].toFixed(2)}  
                                dateString={dateStringForProps}  
                                timeString={timeStringForProps}  
                                matchId={match.id}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>     
        </Container>
    )


    
    return sportsBookPage;
};

SportsBookPage.propTypes = {
    EPL_data:PropTypes.array
};
  
