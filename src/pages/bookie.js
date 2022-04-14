import Head from "next/head";
import { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { DashboardLayout } from "@components/DashboardLayout";
import { BookieLayout } from "@components/Bookie/BookieLayout";
import { StakingDataCard } from "@components/Bookie/StakingDataCard";
import { addLiquidity, getBalance } from "@utils/web3Provider";
import { DaiIcon } from "@components/Icons/DaiIcon";

const useStyle = makeStyles({
  root: {
    marginTop: "1rem",
  },
  bookieHeader: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "48px",
    color: "midnightblue",
  },
  subtitle: {
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "400",
    color: "#5048e5",
  },
  stakingHeader: {
    textAlign: "center",
    fontSize: "36px",
    color: "midnightblue",
  },
  stakingText: {
    marginBottom: "1rem",
    textAlign: "center",
  },
});

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#004e92",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#004e92",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5048e5",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "royalblue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004e92",
    },
  },
});

const BookieHomepage = (props) => {
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

      {/* Two column layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          borderStyle: "groove",
          borderWidth: "4px",
          borderColor: "#5048e5",
          borderRadius: "2rem",
          padding: "1rem",
          overflow: "hidden",
          gap: "1rem",
          backgroundColor: "#f3f5f9",
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "40%",
            borderRight: "2px solid #5048e5",
            paddingRight: "1rem",
          }}
        >
          <h3 className={styles.stakingHeader}>Staking Menu</h3>
          <Typography className={styles.stakingText}>
            Input the amount of DAI you want to stake in the OpenBook Liquidity
            Pool
          </Typography>

          {/* Deposit Amount input box */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "auto",
            }}
          >
            <StyledTextField
              sx={{
                marginX: "auto",
              }}
              value={depositAmountInput}
              id="deposit-input"
              variant="outlined"
              label="Deposit Amount"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDepositAmountInput(e.target.value)}
              InputProps={{
                endAdornment: <DaiIcon />,
              }}
            />
          </Box>

          {/* Buttons box */}
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
              Update Balance
            </Button>
          </Box>
        </Box>
        {/* Right Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "60%",
            gap: "0.5rem",
          }}
        >
          <StakingDataCard
            key="totalBookiePool"
            title="Total Bookie Liquidity"
            data="DAI $$$, $$$, $$$.$$"
          />
          <StakingDataCard
            key="test1"
            title="The Title here"
            data="Some data here too"
          />
          <StakingDataCard
            key="test2"
            title="The Title here"
            data="Some data here too"
          />
          <StakingDataCard
            key="test3"
            title="The Title here"
            data="Some data here too"
          />
        </Box>
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
