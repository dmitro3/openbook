import Head from "next/head";
import { useState } from "react";
import { Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DashboardLayout } from "@components/DashboardLayout";
import { BookieLayout } from "@components/Bookie/BookieLayout";
import { BookieGrid } from "@components/Bookie/BookieGrid";

const useStyle = makeStyles({
  root: {
    marginTop: "1rem",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    height: "4px",
    borderRadius: "2rem",
    /*backgroundColor: "transparent",*/
  },
  indicatorSpan: {
    maxWidth: "40px",
    width: "100%",
    backgroundColor: "#156fd6",
  },
  bookieHeader: {
    margin: "1rem",
    textAlign: "center",
    fontSize: "48px",
  },
});

const BookieHomepage = () => {
  const styles = useStyle();
  const [bookieTabsValue, setBookieTabsValue] = useState(1);
  const handleBookieTabsChange = (event, newValue) => {
    setBookieTabsValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Bookie | OpenEdge</title>
      </Head>
      <h1 className={styles.bookieHeader}>The Bookies Dashboard</h1>
      <BookieGrid />
    </>
  );
};

BookieHomepage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <BookieLayout>{page}</BookieLayout>
    </DashboardLayout>
  );
};

export default BookieHomepage;
