import { Container, Grid } from "@mui/material";
import MatchCard from "@components/Betting/Sportbook/MatchCard";
import PropTypes from "prop-types";

export const SportsBookPage = (props) => {
    let EPL_data = props.EPL_data;
    
    
    let sportsBookPage =  (
        <Container maxWidth={false}>
            <Grid container spacing={2}>
                {
                    EPL_data.map((match) => {
                    let datetime = new Date(match.timestamp);
                    let dateStringForProps=datetime.toLocaleString('default', { month: 'short', day:'numeric' })
                    let timeStringForProps=datetime.toLocaleString('default', { hour: 'numeric', minute:'numeric',  hourCycle: 'h23' })
                    return  (
                        //xl (1920): 12 / 4 = 3
                        //lgp (1400): 12 / 6 = 2
                        //lg(1280): 12/6 = 2
                        //md(1000): 12/6 = 2
                        //smpad(768) 12/6 = 2
                        //sm(600)12/12 = 1
                        //xl(0)12/12 = 1
                            <Grid key={match.id} item xl={4} lgp={6} lg={6} md={6} smpad={6} sm={12} xs={12} >
                                <MatchCard 
                                match1={match.match[0]} 
                                match2={match.match[1]} 
                                outcomes={match.outcomes}
                                outcomesInUS={match.outcomesInUS}
                                outcomesInProb={match.outcomesInProb}
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
  
