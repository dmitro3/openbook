import { useState } from 'react';
import { Box} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Tabs } from "@mui/material";
import { WrapTab } from "@components/WrapTab";

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


export const BookieLayout = (props) => {
  const { children } = props;
  const styles = useStyle();
  const [bookieTabsValue, setBookieTabsValue] = useState(1);
  const handleBookieTabsChange = (event, newValue) => {
    setBookieTabsValue(newValue);
  };

  return (
    <>
		<Box sx={{ width: '100%', borderColor: 'divider'}}>
			<Tabs
			value={bookieTabsValue}
			onChange={handleBookieTabsChange}
			variant="fullWidth"
			centered
			aria-label="bookie page sub tabs"
			classes={{
				root: styles.root,
				indicator: styles.indicator,
				indicatorSpan: styles.indicatorSpan,
			}}
			TabIndicatorProps={{
				children: <span className="MuiTabs-indicatorSpan" />,
			}}
			>
			<WrapTab 
			value={1} 
			href="/bookie" 
			label="Overview" 
			sx={{ py: "0px" }} 
			/>
			<WrapTab
			value={2}
			href="/bookie/bet-mining"
			label="Bet Mining"
			sx={{ py: "0px" }}
			/>
			<WrapTab
			value={3}
			href="/bookie/my-stake"
			label="My Stake"
			sx={{ py: "0px" }}
			/>
			</Tabs>
			{children}
		</Box>
    </>
  );
};
