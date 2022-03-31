import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import styles from '@styles/mybets.module.css';

const Dashboard = (props) => 
{  
    return (
        <>
            <div className={styles.row}>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <img className={styles.user_stats_image} src="https://pixner.net/bitbetio/main/assets/images/icon/user-info-icon-1.png" alt="icon"/>
                        <div className={styles.textArea}>
                            <h4>678</h4>
                            <p className={styles.mdr}>Total Match</p>
                        </div>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <img className={styles.user_stats_image} src="https://pixner.net/bitbetio/main/assets/images/icon/user-info-icon-2.png" alt="icon"/>
                        <div className={styles.textArea}>
                            <h4>91%</h4>
                            <p className={styles.mdr}>Win Ratio</p>
                        </div>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <img className={styles.user_stats_image} src="https://pixner.net/bitbetio/main/assets/images/icon/user-info-icon-3.png" alt="icon"/>
                        <div className={styles.textArea}>
                            <h4>22</h4>
                            <p className={styles.mdr}>Achievements</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Dashboard;