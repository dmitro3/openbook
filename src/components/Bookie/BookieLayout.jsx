import { useState } from 'react';
import { Box, Button, Tab, Tabs, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { WrapTab } from "@components/WrapTab";

import { BookieOverview } from "@components/Bookie/BookieOverview";
import { Staking } from "@components/Bookie/Staking";
import { MyStake } from "@components/Bookie/MyStake";

const useStyle = makeStyles({
	root: {
	  marginTop: "1rem",
	},
	indicator: {
	  display: "flex",
	  justifyContent: "center",
	  height: "4px",
	  borderRadius: "2rem",
	},
	indicatorSpan: {
	  maxWidth: "40px",
	  width: "100%",
	  backgroundColor: "#1a009e",
	},
	bookieHeader: {
	  margin: "1rem",
	  textAlign: "center",
	  fontSize: "48px",
	},
});


export const BookieLayout = (props) => {
  const styles = useStyle();

  const [bookieTabsValue, setBookieTabsValue] = useState("staking");
  const handleBookieTabsChange = (event, newValue) => {
    setBookieTabsValue(newValue);
  };

  return (
    <>
		<Box sx={{py:'25px',px:'50px',width:'95%',minHeight:'1000px'}}>
			<Box sx={{ width: '100%', backgroundColor: 'var(--background-default)', py:"20px"}}>
                    <Tabs value={bookieTabsValue} onChange={(event,newValue)=>handleBookieTabsChange(event,newValue)} centered variant="fullWidth">
                    <Tab value="overview" label="Overview" />
                    <Tab value="staking" label="Staking" />
                    <Tab value="my-stake" label="My Stake" />
                    </Tabs>
                </Box>

                {bookieTabsValue == "overview" ? <BookieOverview/>  : void(0)}
                {bookieTabsValue == "staking" ? <Staking/> : void(0)}
                {bookieTabsValue == "my-stake" ? <MyStake/> : void(0)}
		</Box>
    </>
  );
};
