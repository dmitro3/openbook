import Head from "next/head";
import { useState } from "react";
import { Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DashboardLayout } from "@components/Navigation/DashboardLayout";
import { BookieOverviewGrid } from "@components/Bookie/BookieOverviewGrid";

const useStyle = makeStyles({
  bookieHeader: {
    margin: "1rem",
    textAlign: "center",
    fontSize: "48px",
    color: "#5048E5",
  },
});

export const BookieOverview = () => {
  const styles = useStyle();

  return (
    <>
      <h1 className={styles.bookieHeader}>The Bookies Dashboard</h1>
      <BookieOverviewGrid />
    </>
  );
};

BookieOverview.getLayout = (page) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};
