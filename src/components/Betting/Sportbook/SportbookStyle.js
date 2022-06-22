import { styled, experimental_sx as sx } from '@mui/system';
import { Avatar, Typography, Button, Card, CardContent, Grid, Box} from '@mui/material';
import {GoTriangleUp,GoTriangleDown} from 'react-icons/go'

export const TeamCardAvatar = styled(Avatar)((props)  => sx({
    backgroundColor: '#f5f5f5',
    height: 56,
    width: 56,
    margin: 'auto'
}));

export const TeamCardDiv = styled("div")((props)  => sx({
    width:"50px",
    height:"50px",
    margin:"auto"
}));

export const TeamCardTypography = styled(Typography)((props)  => sx({
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'10px',
    textAlign:'center'
}));

export const BetButtonStyle = styled(Button)((props)  => sx({
    mr: 1,
    px: 1.5,
    py: 2,
    order: props.order,
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#d9d9d9'
    },
    '*':{
        pointerEvents: 'none'
    },
    backgroundColor: props.inslip ? '#dddddd' : '#f5f5f5'
}));

export const BetButtonNumber = styled(Typography)((props)  => sx({
    mr:'auto'
}));

export const BetButtonOdds = styled(Typography)((props)  => sx({
    ml:"auto",
    fontWeight:  props.oddschanging == "none" ? "400" : "bold",
    color: props.oddschanging == "none" ? "#005a98" : props.oddschanging == "up" ? "red" : "green"

}));

export const BetButtonTriangleUp = styled(GoTriangleUp)((props)  => sx({
    position:"absolute",
    top:"20px",
    left:"20%",
    color: "green",
    visibility: props.oddschanging ? "visible" : "hidden"
}));

export const BetButtonTriangleDown = styled(GoTriangleDown)((props)  => sx({
    position:"absolute",
    top:"20px",
    left:"20%",
    color: "red",
    visibility: props.oddschanging ? "visible" : "hidden"
}));

export const BetButtonSpace = styled("div")((props)  => sx({
    padding:'0.5vw'
}));

export const BetButtonDiv = styled("div")((props)  => sx({
    position:'relative'
}));

export const FavoriteButtonStyle = styled(Button)((props)  => sx({
    mr: 1,
    padding: '1rem',
    backgroundColor: "#f5f5f5",
    fontSize: '1.2rem',
    cursor: 'pointer',
    order: '99',
    minHeight: '56px',
    '&:hover': {
        backgroundColor: '#d9d9d9'
    },
    '*':{
        pointerEvents: 'none'
    }
}));

export const MatchCardCard = styled(Card)((props)  => sx({
    height: '270px'
  }));
  
  export const MatchCardCardContent = styled(CardContent)((props)  => sx({
    height:"100%",
    position:'relative',
    paddingBottom:'100px', 
    marginTop:'0px'
  }));
  
  export const MatchCardGridContainer = styled(Grid)((props)  => sx({
    justifyContent: 'space-between',
    width:"100%",
    marginLeft:'0px',
    marginRight:'0px',
    marginTop:'0px'
  }));
  
  export const MatchCardGridItem = styled(Grid)((props)  => sx({
    paddingLeft:'0px',
    width:'35%',
    paddingTop: '20px'
  }));
  
  export const MatchCardGridItem2 = styled(Grid)((props)  => sx({
    textAlign:'center',
    paddingLeft:'0px',
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    alignContent: "center",
    paddingTop:"20px"
  }));
  
  export const MatchCardTypographyDateTime = styled(Typography)((props)  => sx({
    paddingLeft:'0px',
    width:'100%',
    paddingTop: '20px'
    
  }));
  
  export const MatchCardButtonsBox = styled(Box)((props)  => sx({
    display:"flex",
    alignItems: "center", 
    justifyContent: "center",
    position:'absolute',
    bottom:'7%',
    left:'2%',
    right:'2%'
  }));