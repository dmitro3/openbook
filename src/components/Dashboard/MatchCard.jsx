import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import PropTypes from "prop-types";

let team1 = "Liverpool";
let team2 = "Inter Milan";

export const MatchCard = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item >
          <div>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
              margin: 'auto'
            }}
          >
          </Avatar>
          </div>

          <Typography sx={{margin:'auto'}}>{team1}</Typography>
        </Grid>

        <Grid item>
            <div>
              <Typography sx={{margin:'auto'}}>Tomorrow</Typography>
            </div>
        </Grid>       

        <Grid item sx={{paddingRight:"40px"}}>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
              margin: 'auto'
            }}
          >
          </Avatar>
          <Typography sx={{margin:'auto'}}>{team2}</Typography>
        </Grid>
        
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

MatchCard.propTypes = {
  budgetNumber: PropTypes.number,
};
