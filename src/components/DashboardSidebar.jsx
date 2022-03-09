import { useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { NavItem } from "./NavItem";
import { FaStar,FaFire,FaHandshake,FaGamepad,FaFutbol,FaBasketballBall,FaHockeyPuck,FaFootballBall,FaBaseballBall,FaFlagCheckered} from 'react-icons/fa';
import {RiMouseFill,RiBoxingFill} from 'react-icons/ri';
import {CustomDivider} from '../components/Dashboard/CustomDivider'

const bettingZoneitems = [
  {
    href: "/featured",
    icon: <FaStar />,
    title: "Featured",
  },
  {
    href: "/trending",
    icon: <FaFire/>,
    title: "Trending Games",
  },
  {
    href: "/products",
    icon: <FaHandshake/>,
    title: "Parlays",
  }
];

const sportsItems = [
  {
    href: "/settings",
    icon: <FaGamepad />,
    title: "E-Sports",
  },
  {
    href: "/epl_football",
    icon: <FaFutbol />,
    title: "Football",
  },
  {
    href: "/nba_basketball",
    icon: <FaBasketballBall />,
    title: "Basketball",
  },
  {
    href: "/ahl_hockey",
    icon: <FaHockeyPuck />,
    title: "Ice Hockey",
  },
  {
    href: "/settings",
    icon: <FaFootballBall />,
    title: "American Football",
  },
  {
    href: "/settings",
    icon: <RiMouseFill />,
    title: "Onhovered Item",
  },
  {
    href: "/settings",
    icon: <FaBaseballBall />,
    title: "Baseball",
  },  
  {
    href: "/settings",
    icon: <RiBoxingFill />,
    title: "UFC/MMA",
  },  
  {
    href: "/settings",
    icon: <FaFlagCheckered />,
    title: "Motorsports",
  },   
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <div style={{
          overflow: "hidden",
          margin: "1rem",
          alignSelf: "center",
          }}>
          <NextLink 
            href="/" 
            passHref
            >
            <a style={{
              textDecoration:"none"
            }}>
                <div style={{
                  width:"100px",
                  height:"100px",
                  margin:"auto"
                }}>
                  <Image
                    src="/../public/static/templogosportsbook.png"
                    alt="logo"
                    width="100"
                    height="100"
                    layout="responsive"
                    className="logoStyle"
                    loading="lazy"
                  />
                </div>
                <Typography color="neutral.100" 
                variant="h3" >
                  OpenEdge
                </Typography>
            </a>
          </NextLink>
        </div>
        <CustomDivider/>
        <Box sx={{ flexGrow: 1 }}>
          {bettingZoneitems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <CustomDivider/>
        <Box sx={{ flexGrow: 1 }}>
          {sportsItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        
        <CustomDivider/>
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need something to put here?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}>
          </Box>
          <NextLink href="/" passHref>
            <Button
              color="secondary"
              component="a"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              >
              Superfluous Button
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
