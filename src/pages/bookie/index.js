import Head from "next/head";
import { useState } from "react";
import { Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DashboardLayout } from "@components/DashboardLayout";
import { BookieLayout } from "@components/BookieLayout";
import { BookieGrid } from "@components/BookieGrid";

/* Temporily put them here */
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Box, TextField} from "@mui/material";


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

  //Tempoerarily putting these here
  const [textFieldInput, setTextFieldInput] = useState("")

  return (
    <>
      <Head>
        <title>Bookie | OpenEdge</title>
      </Head>
      <h1 className={styles.bookieHeader}>The Bookies Dashboard</h1>
      <BookieGrid /> 

      {/*Tempoerarily putting these here*/}
      <Box sx={{display:'flex',width:'100%'}}>
      <TextField
          sx={{
            marginX:'auto'
          }}
          value={textFieldInput}
          id="outlined-number"
          label="Deposit Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e)=>setTextFieldInput(e.target.value)}
        />
      </Box>

      <Box sx={{display:'flex',width:'100%',marginTop:'10px'}}>
        <Button variant="contained" sx={{marginLeft:'auto',marginRight:'10px'}} onClick={()=>console.log(`deposit button clicked, value is ${textFieldInput}`)}>Deposit Liquidity</Button>
        <Button variant="contained"sx={{marginRight:'auto',marginLeft:'10px'}} onClick={()=>console.log('withdrawl button clicked')}>Withdrawl Liquidity</Button>
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
