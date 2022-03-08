import { Avatar, Box, Card, CardContent, Grid, Typography, Button} from '@mui/material';
import PropTypes from "prop-types";
import {RiStarLine} from 'react-icons/ri';
import Image from "next/image";

const static_english_soccer_icons_path = "/../public/static/images/english_soccer_team_icons/";


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
          <Avatar
            sx={{
              backgroundColor: '#f5f5f5',
              height: 56,
              width: 56,
              margin: 'auto'
            }}
          >
          <div style={{
            width:"40px",
            height:"40px",
            margin:"auto"
          }}>
            <Image
              src={static_english_soccer_icons_path + props.team1 + ".png"}
              alt="logo"
              width="100"
              height="100"
              layout="responsive"
              className="logoStyle"
              loading="lazy"
            />
          </div>

          </Avatar>

          <Typography sx={{margin:'auto'}}>{props.team1}</Typography>
        </Grid>

        <Grid item sx={{marginLeft:'auto',marginRight:'auto',marginTop:'30px',textAlign:'center'}}>
              <Typography>Tomorrow</Typography>
              <Typography>12:30</Typography>
        </Grid>       

        <Grid item >
          <Avatar
            sx={{
              backgroundColor: '#f5f5f5',
              height: 56,
              width: 56,
              margin: 'auto'
            }}
          >
          <div style={{
            width:"40px",
            height:"40px",
            margin:"auto"
          }}>
            <Image
              src={static_english_soccer_icons_path + props.team2 + ".png"}
              alt="logo"
              width="100"
              height="100"
              layout="responsive"
              className="logoStyle"
              loading="lazy"
            />
          </div>

          </Avatar>

          <Typography sx={{margin:'auto'}}>{props.team2}</Typography>
        </Grid>
        
      </Grid>
      <div style={{display:"flex",alignItems: "center", justifyContent: "center"}}>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          
          sx={{
            mr: 1,
            padding: 1.5,
            backgroundColor: "#f5f5f5"
          }}
          variant="body2"
        >
          <Typography sx={{margin:'auto'}}>1</Typography>
          <div style={{height:"30px",width:"30px"}}></div>
          <Typography sx={{margin:'auto',color:'#005a98'}}>{props.outcome1}</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          
          sx={{
            mr: 1,
            padding: 1.5,
            backgroundColor: "#f5f5f5"
          }}
          variant="body2"
        >
          <Typography sx={{margin:'auto'}}>X</Typography>
          <div style={{height:"30px",width:"30px"}}></div>
          <Typography sx={{margin:'auto',color:'#005a98'}}>{props.outcomeX}</Typography>
        </Button>
        </Box>
        <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          
          sx={{
            mr: 1,
            padding: 1.5,
            backgroundColor: "#f5f5f5"
          }}
          variant="body2"
        >
          <Typography sx={{margin:'auto'}}>2</Typography>
          <div style={{height:"30px",width:"30px"}}></div>
          <Typography sx={{margin:'auto',color:'#005a98'}}>{props.outcome2}</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          
          sx={{
            mr: 1,
            padding: '1.1rem',
            backgroundColor: "#f5f5f5",
            fontSize: '1.2rem'
          }}
          variant="body2"
        >
        <RiStarLine/>
        </Button>
      </Box>
      </div>
    </CardContent>
  </Card>
);

MatchCard.propTypes = {
  team1:PropTypes.string,
  team2:PropTypes.string,
  outcome1:PropTypes.number,
  outcomeX:PropTypes.number,
  outcome2:PropTypes.number,
  date_time:PropTypes.string
};
