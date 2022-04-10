import styles from '@styles/landing.module.css';
import { Box, Typography, Button} from '@mui/material';
import Image from 'next/image';
import {useEffect,useState} from 'react';

//Landing Stuctures
import { NavBar } from '@components/Landing/NavBar';
import { HeroBanner} from "@components/landing/HeroBanner";
import { Features } from "@components/landing/Features";
import { FiveStepsForBettor } from '@components/Landing/FiveStepsForBettor';
import { FiveStepsForBookie } from "@components/Landing/FiveStepsForBookie";
import { FaqForLanding } from "@components/Landing/FaqForLanding";
import { Subscribe } from "@components/landing/Subscribe"
import { LandingFooter } from '@components/Landing/LandingFooter';



const Dashboard = (props) => {
    const[fiveStepsTabState,setFiveStepsTabState] = useState("bettor")
    return (
        <>
            <NavBar landingStyles={styles} />
            <HeroBanner styles={styles} />
            <Features styles={styles} />
            <Box className={styles.fiveStepsToggleBox}>
            <form className={styles.tabber}>
                    <label className={styles.tabber_label} htmlFor="t1" onClick={()=>setFiveStepsTabState("bettor")}>Bettor</label>
                    <label className={styles.tabber_label} htmlFor="t2" onClick={()=>setFiveStepsTabState("bookie")}>Bookie</label>
                    <div className={`${styles.blob} ${fiveStepsTabState=="bettor" ? styles.blob_bettor: styles.blob_bookie}`}></div>
                </form>
            </Box>
            {
                fiveStepsTabState=="bettor" ?
                <FiveStepsForBettor styles={styles}/> : 
                <FiveStepsForBookie styles={styles}/>
            }
            <FaqForLanding landing_sytles={styles}></FaqForLanding>
            <Subscribe styles={styles}/>
            <LandingFooter />
        </>
    )

}

export default Dashboard;