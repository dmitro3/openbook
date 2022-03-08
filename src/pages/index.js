import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { MatchCard } from "../components/Dashboard/MatchCard";
import { DashboardLayout } from "../components/DashboardLayout";

let data = require('../../odds.json');
let EPL_data = data.Soccer.EPL;
const team1 = "Liverpool";
const team2 = "Newcastle";
console.log(EPL_data)
const Dashboard = () => (
  <>
    <Head>
      <title>Home | OpenEdge</title>
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
        {EPL_data.map((item) => (
          <Grid key={item.id} item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard team1={item.match[0]} team2={item.match[1]} outcome1={item.outcomes['1'].toFixed(2)} outcomeX={item.outcomes['X'].toFixed(2)} outcome2={item.outcomes['2'].toFixed(2)}  date_time={item.timestamp} />
          </Grid>
          
        ))}

        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
