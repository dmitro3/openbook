import { Box, Paper, Grid, Card, CardContent, Typography } from '@mui/material';
import styles from '@styles/BookieGrid.module.css';

const data = {
	total: "$1,765,843.29",
	myLq: "$453.77",
	myPct: "0.005%"
}

export default function BookieGrid(props) {
  return (
	<div>
		<Box sx={{ 
			flexGrow: 1,
			p: '2rem',
		}}>
			<h1 className={styles.bookieHeader}>Bookie Liquidity Pool</h1>
			<Grid container 
			spacing={2}
			zeroMinWidth
			//columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }}
			>
				<Grid item
				xs={4}
				key="myLiqDisplay"
				noWrap
				>
					<Card 
					variant="outlined"
					>
						<CardContent sx={{padding: "1rem"}}>
							<Typography 
							variant="subtitle1"
							sx={{paddingBottom: "1rem"}}
							>
								My Liquidity
							</Typography>
							<Typography 
							variant="h6" 
							className={styles.numbers}
							>
								{data.myLq}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item
				xs={4}
				key="totalLiqDisplay"
				noWrap
				>
					<Card 
					variant="outlined"
					>
						<CardContent sx={{padding: "1rem"}}>
							<Typography 
							variant="subtitle1"
							sx={{paddingBottom: "1rem"}}
							>
								Total Liquidity
							</Typography>
							<Typography 
							variant="h6" 
							className={styles.numbers}
							>
								{data.total}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item 
				xs={4}
				key="myPctLiqDisplay"
				noWrap
				>
					<Card 
					variant="outlined"
					>
						<CardContent sx={{padding: "1rem"}}>
							<Typography 
							variant="subtitle1"
							sx={{paddingBottom: "1rem"}}
							>
								Percent Ownership
							</Typography>
							<Typography 
							variant="h6" 
							className={styles.numbers}
							>
								{data.myPct}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item 
				xs={12}
				key="lpPerformanceGraph"
				>
					<Card variant="outlined">
						<CardContent sx={{padding: "1rem"}}>
							<Typography>Graph of Recent Performance</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	</div>
  );
}

