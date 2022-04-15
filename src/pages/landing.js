import styles from "@styles/landing.module.css";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LandingFooterDivider } from "@components/Landing/LandingFooterDivider";

//Landing Structures
import { NavBar } from "@components/Landing/NavBar";
import { HeroBanner } from "@components/Landing/HeroBanner";
import { Features } from "@components/Landing/Features";
import { FiveStepsToggle } from "@components/Landing/FiveStepsToggle";
import { FiveStepsForBettor } from "@components/Landing/FiveStepsForBettor";
import { FiveStepsForBookie } from "@components/Landing/FiveStepsForBookie";
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { Subscribe } from "@components/Landing/Subscribe";
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
            This is What You Get
          </Typography>
          <Typography className={styles.detailDescriptions2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. 
          </Typography>
        </Box>

        <Box sx={{py:'50px', display: 'flex',flexDirection: 'column',alignItems: 'flex-start'}}>
          <Box>
            <Box sx={{display:'flex'}}>
              <Image src="/static/images/landing/why_we_unique_1.png" height={80} width={80}/>
              <Box sx={{display:'flex',flexDirection:"column",marginLeft:'20px'}}>
                <Typography sx={{fontSize:'32px',color:'white',textAlign:'left',fontWeight:'500'}}>Single Liquidity Pool</Typography>
                <Typography sx={{frontSize:'18px',color:'white',textAlign:'left'}}>Lorem Ipsum is simply dummy text of the printing and typesettingindustry. </Typography>
              </Box>
            </Box>
            <LandingFooterDivider />
          </Box>
          <Box>
            <Box sx={{display:'flex'}}>
              <Image src="/static/images/landing/why_we_unique_2.png" height={80} width={80}/>
              <Box sx={{display:'flex',flexDirection:"column",marginLeft:'20px'}}>
                <Typography sx={{fontSize:'32px',color:'white',textAlign:'left',fontWeight:'500'}}>No deposit required</Typography>
                <Typography sx={{frontSize:'18px',color:'white',textAlign:'left'}}>Lorem Ipsum is simply dummy text of the printing and typesettingindustry. </Typography>
              </Box>
            </Box>
            <LandingFooterDivider />
          </Box>
          <Box>
            <Box sx={{display:'flex'}}>
              <Image src="/static/images/landing/why_we_unique_3.png" height={80} width={80}/>
              <Box sx={{display:'flex',flexDirection:"column",marginLeft:'20px'}}>
                <Typography sx={{fontSize:'32px',color:'white',textAlign:'left',fontWeight:'500'}}>Polygon based</Typography>
                <Typography sx={{frontSize:'18px',color:'white',textAlign:'left'}}>Lorem Ipsum is simply dummy text of the printing and typesettingindustry. </Typography>
              </Box>
            </Box>
            <LandingFooterDivider />
          </Box>
          <Box>
            <Box sx={{display:'flex'}}>
              <Image src="/static/images/landing/why_we_unique_4.png" height={80} width={80}/>
              <Box sx={{display:'flex',flexDirection:"column",marginLeft:'20px'}}>
                <Typography sx={{fontSize:'32px',color:'white',textAlign:'left',fontWeight:'500'}}>Be the bookie</Typography>
                <Typography sx={{frontSize:'18px',color:'white',textAlign:'left'}}>Lorem Ipsum is simply dummy text of the printing and typesettingindustry. </Typography>
              </Box>
            </Box>
            <LandingFooterDivider />
          </Box>
        </Box>
      </Box>

      <Box className={styles.waveTransition3}/>

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
