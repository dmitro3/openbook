import { DashboardLayout } from "@components/DashboardLayout";
import { Box, Button, Tab, Tabs, Typography, Grid,Container } from "@mui/material";
import Head from "next/head";
import {connect} from "react-redux";
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import MatchCard from "@components/Dashboard/MatchCard";

const Favorite = (props) => 
{  
    const [routerReady,setRouterReady] = useState(false);
    const router = useRouter()

    useEffect(()=>{
        if(!router.isReady) return;

        setRouterReady(true)
    }, [router.isReady]);

    const odds =  props.odds.oddsDict;
    const favoriteGames = props.favoriteMatch.favoritedMatchArray;
    console.log(favoriteGames)
    return (
        <>
        <Head>
            <title>Favorite Games | OpenEdge</title>
        </Head>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
            display: 'flex'
            }}
        >
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                {
                    favoriteGames.map((item,index)=>{
                        let match = odds[item];
                        let datetime = new Date(match.timestamp);
                        let dateStringForProps=datetime.toLocaleString('default', { month: 'short', day:'numeric' })
                        let timeStringForProps=datetime.toLocaleString('default', { hour: 'numeric', minute:'numeric',  hourCycle: 'h23' })
                        return(
                            <Grid key={match.id} item lg={6} sm={12} xl={4} xs={12}>
                                <MatchCard key={index}
                                match1={match.match[0]} 
                                match2={match.match[1]} 
                                outcomes={match.outcomes}
                                outcomesInUS={match.outcomesInUS}
                                outcomesInProb={match.outcomesInProb}
                                dateString={dateStringForProps}  
                                timeString={timeStringForProps}  
                                matchId={match.id}
                                ></MatchCard>
                            </Grid>

                        )
                    })
                }
                </Grid>     
            </Container>
        </Box>
    </>
    )
}

const mapStateToProps = (state) => {
    return {
        favoriteMatch: state.favoriteMatch,
        odds: state.odds
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};


Favorite.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);