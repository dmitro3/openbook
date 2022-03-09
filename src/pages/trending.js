import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { MatchCard } from "../components/Dashboard/MatchCard";
import { DashboardLayout } from "../components/DashboardLayout";

let data = require("../../odds.json");
let EPL_data = data.Soccer.EPL;

const Dashboard = () => (
  <>
    <Head>
      <title>Trending | Betting | OpenEdge</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {EPL_data.map((match) => {
            let datetime = new Date(match.timestamp);
            let dateStringForProps = datetime.toLocaleString("default", {
              month: "short",
              day: "numeric",
            });
            let timeStringForProps = datetime.toLocaleString("default", {
              hour: "numeric",
              minute: "numeric",
              hourCycle: "h23",
            });
            return (
              <Grid key={match.id} item lg={4} sm={6} xl={3} xs={12}>
                <MatchCard
                  team1={match.match[0]}
                  team2={match.match[1]}
                  outcome1={match.outcomes["1"].toFixed(2)}
                  outcomeX={match.outcomes["X"].toFixed(2)}
                  outcome2={match.outcomes["2"].toFixed(2)}
                  dateString={dateStringForProps}
                  timeString={timeStringForProps}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
