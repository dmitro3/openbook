import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../components/DashboardLayout";

const Products = () => (
  <>
    <Head>
      <title>Products | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>

          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
