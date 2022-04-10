import styles from "@styles/landing.module.css";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LandingFooterDivider } from "@components/Landing/LandingFooterDivider";

//Landing Structures
import { NavBar } from "@components/Landing/NavBar";
import { HeroBanner } from "@components/landing/HeroBanner";
import { Features } from "@components/landing/Features";
import { FiveStepsToggle } from "@components/landing/FiveStepsToggle";
import { FiveStepsForBettor } from "@components/Landing/FiveStepsForBettor";
import { FiveStepsForBookie } from "@components/Landing/FiveStepsForBookie";
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { Subscribe } from "@components/landing/Subscribe";
import { LandingFooter } from "@components/Landing/LandingFooter";

const Dashboard = (props) => {
  const [fiveStepsTabState, setFiveStepsTabState] = useState("bettor");
  return (
    <>
      <NavBar landingStyles={styles} />
      <HeroBanner styles={styles} />
      <Features styles={styles} />
      <Box className={styles.uniqueBox}>
        <Box>
          <Typography className={styles.subTitle}>
            Why is OpenBook better?
          </Typography>
          <Typography className={styles.title}>
            5 reasons why we are better
          </Typography>
          <Typography className={styles.detailDescriptions2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s,
          </Typography>
        </Box>
        <Box>
          <Box>
            <Box>
              <img />
              <Box>
                <Typography></Typography>
                <Typography></Typography>
              </Box>
            </Box>
            <LandingFooterDivider />
          </Box>
        </Box>
      </Box>
      <FiveStepsToggle
        styles={styles}
        fiveStepsTabState={fiveStepsTabState}
        setFiveStepsTabState={setFiveStepsTabState}
      />
      {fiveStepsTabState == "bettor" ? (
        <FiveStepsForBettor
          styles={styles}
          fiveStepsTabState={fiveStepsTabState}
        />
      ) : (
        <FiveStepsForBookie
          styles={styles}
          fiveStepsTabState={fiveStepsTabState}
        />
      )}

      <FaqForLanding landingStyles={styles}></FaqForLanding>
      <Subscribe styles={styles} />
      <LandingFooter />
    </>
  );
};

export default Dashboard;
