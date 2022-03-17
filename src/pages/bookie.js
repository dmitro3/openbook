import Head from "next/head";
import { DashboardLayout } from "@components/DashboardLayout";
import BookieGrid from "@components/BookieGrid";

const Dashboard = () => (
  <>
    <Head>
      <title>Bookie | OpenEdge</title>
    </Head>
    <BookieGrid />
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
