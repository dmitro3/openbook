import Head from "next/head";
import { Box, Container, Button, Grid, Typography } from "@mui/material";
import { MatchCard } from "../components/Dashboard/MatchCard";
import { DashboardLayout } from "../components/DashboardLayout";
import NextLink from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Dashboard = () => (
  <>
    <Head>
      <title>LP Home | OpenEdge</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mx: "auto",
            width: "160px",
            "& img": {
              width: "100%",
            },
          }}
        ></Box>
        <NextLink href="/" passHref>
          <Button
            color="secondary"
            component="a"
            endIcon={<OpenInNewIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
          >
            Superfluous Button
          </Button>
        </NextLink>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
