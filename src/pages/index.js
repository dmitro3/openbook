import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { MatchCard } from "../components/Dashboard/MatchCard";
import { LatestOrders } from "../components/Dashboard/LatestOrders";
import { LatestProducts } from "../components/Dashboard/LatestProducts";
import { Sales } from "../components/Dashboard/Sales";
import { TasksProgress } from "../components/Dashboard/TasksProgress";
import { TotalCustomers } from "../components/Dashboard/TotalCustomers";
import { TotalProfit } from "../components/Dashboard/TotalProfix";
import { TrafficByDevice } from "../components/Dashboard/TrafficByDevice";
import { DashboardLayout } from "../components/DashboardLayout";

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
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard budgetNumber="21" />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MatchCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
