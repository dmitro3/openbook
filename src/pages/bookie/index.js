import Head from "next/head";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { DashboardLayout } from "@components/DashboardLayout";
import { BookieLayout } from "@components/BookieLayout";
import { BookieGrid } from "@components/BookieGrid";
import { addLiquidity, getBalance } from "@utils/web3Provider";
import {
  Tabs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  TextField,
} from "@mui/material";

const useStyle = makeStyles({
  root: {
    marginTop: "1rem",
  },
  bookieHeader: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "48px",
    color: "#1a009e",
  },
  subtitle: {
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "400",
    color: "#4300ed",
  },
});

const BookieHomepage = () => {
  const styles = useStyle();
  const [bookieTabsValue, setBookieTabsValue] = useState(1);
  const handleBookieTabsChange = (event, newValue) => {
    setBookieTabsValue(newValue);
  };

  const [depositAmountInput, setDepositAmountInput] = useState("");

  return (
    <>
      <Head>
        <title>Bookie | OpenEdge</title>
      </Head>
      <h1 className={styles.bookieHeader}>Become the Bookie:</h1>
      <h2 className={styles.subtitle}>
        Provide liquidity for bettors and earn over time
      </h2>

      {/* Deposit Amount input box */}
      <Box sx={{ display: "flex", width: "100%" }}>
        <TextField
          sx={{
            marginX: "auto",
          }}
          value={depositAmountInput}
          id="outlined-number"
          label="Deposit Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDepositAmountInput(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", width: "100%", marginTop: "1rem" }}>
        <Button
          variant="contained"
          sx={{ marginLeft: "auto", marginRight: "10px" }}
          onClick={() => addLiquidity(depositAmountInput)}
        >
          Stake DAI
        </Button>

        <Button
          variant="contained"
          sx={{ marginRight: "auto", marginLeft: "10px" }}
          onClick={() => getBalance()}
        >
          Get Balance
        </Button>
      </Box>
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
