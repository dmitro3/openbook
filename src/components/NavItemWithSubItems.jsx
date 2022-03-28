import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem, Collapse,List,Chip } from '@mui/material';
import { useState } from 'react';
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {NavItembutton} from "@components/NavItemButtonEmpty"

export const NavItemWithSubItems = (props) => {
  const { href, icon, sport, leagues, leagues_length_arr, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
          onClick={handleClick}
        >
          <Box sx={{ flexGrow: 1 }}>
            {sport}
          </Box>
          <MdOutlineKeyboardArrowDown className={`nav-item-button-arrow ${open ? "nav-item-button-arrow-opened" : ""} `}/>
          <style>
            {`
                .nav-item-button-arrow{
                    width: 20px;
                    height: 20px;
                    transition: 0.2s;
                    transform: rotateZ(0deg);
                }
                .nav-item-button-arrow-opened{
                    transform: rotateZ(-90deg);
                }
            `}
        </style>
        </Button>
    </ListItem>
    <Collapse in={open} timeout="auto">
    <List component="div" disablePadding>
    {leagues.map((league,leagueIndex)=>{
        let empty = leagues_length_arr[leagueIndex] == 0
        let href = `/Matches/${sport}/${league}`
        return(
        <ListItem 
          key={`${league}/${leagueIndex}`}
          disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                paddingLeft: '15%',
                width:'95%'
            }}>
            <NavItembutton league={league} empty={empty} active={false} href={href}/> 
        </ListItem>
        )

    })}
        </List>
    </Collapse>
    </>
  );
};

NavItemWithSubItems.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  sport: PropTypes.string
};
