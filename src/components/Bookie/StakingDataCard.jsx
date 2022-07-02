import { Card, CardContent, Typography, Box } from '@mui/material';
import { StakingDivider } from '@components/Bookie/StakingDivider';

export const StakingDataCard = (props) => {
	return(
		<Card 
		variant="outlined"
		
		>
			<CardContent sx={{py:'16px !important'}}>
				<Box sx={{display:'flex',justifyContent:'space-between',}}>
					<Box>
						<Typography 
						variant="h5"
						sx={{color: "#5048E5"}}
						>
							{props.title}
						</Typography>
						<Typography 
						variant="p"
						sx={{color: "#161440"}}
						>
							{props.description}
						</Typography>
					</Box>

					<Box sx={{display:'flex',alignItems:'center'}}>
						<Typography 
						variant="h6" 
						sx={{color: `${props.unit == "shares" ? "#1890ff" : "#f0ad39"}`, textAlign: "right"}}
						>
							{`${props.data} ${props.unit}`}
						</Typography>
					</Box>
				</Box>

			</CardContent>
		</Card>
)};