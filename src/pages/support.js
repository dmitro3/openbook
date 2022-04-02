import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import styles from '@styles/support.module.css';
import { FAQ } from "@components/Dashboard/FAQ";
import {ContactForm} from "@components/Dashboard/ContactForm"

const Dashboard = (props) => 
{  
    const types = {
        open_book: 'OpenBook',
        crypto: 'crypto',
        betting: 'betting',
        bookies: 'bookies'
    }

    const question_answer_type_dict = [
        {
            question: "How fast do I get paid once I win a bet?",
            answer: "Instantly",
            type: types.open_book,
        },
        {
            question: "I want to bet on OpenBook, what do I need to do?",
            answer: "Step 1 ... step 2 ... step 3 ...",
            type: types.open_book,
        },
        {
            question: "What commision do I have to pay for betting?",
            answer: "5% each bet",
            type: types.open_book,
        },
        {
            question: "What kind of escrow you provide?",
            answer: "smart contract bluh bluh bluh",
            type: types.open_book,
        },
        {
            question: "What commision do I have to pay for betting?",
            answer: "5% each bet",
            type: types.open_book,
        },
        {
            question: "What make us unique?",
            answer: "We just are",
            type: types.open_book,
        },
        {
            question: "How do I deposit and withdrawl as a bettor?",
            answer: "MetaMask",
            type: types.open_book,
        },
        {
            question: "How do I deposit and withdrawl as a bookie?",
            answer: "MetaMask",
            type: types.open_book,
        },
        {
            question: "How many bet strategies we offer?",
            answer: "One and one only",
            type: types.betting,
        },
        {
            question: "What is Decimal odds?",
            answer: "It's an odds with decimal point",
            type: types.betting,
        },
        {
            question: "What is American odds?",
            answer: "It's an odds that invented by weridos",
            type: types.betting,
        },       
        {
            question: "What is DAI?",
            answer: "Dai is a currency that ~= 1 dollar",
            type: types.crypto,
        },
        {
            question: "What is a wallet?",
            answer: "wallet is wallet",
            type: types.crypto,
        },
        {
            question: "What is MetaMask?",
            answer: "MetaMask is MetaMask",
            type: types.crypto,
        },
    ]
        

    return (
    <>
    <Head>
        <title>Support | OpenEdge</title>
    </Head>
        <Box>
            <section className={`${styles.bannerSction}`}>
            <div className={`${styles.overlay}`}>
                <img src="https://pixner.net/bitbetio/main/assets/images/contact-illus.png" className={`${styles.backgroundImg}`} alt="image"/>
                <div className={styles.bannerContent}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                                <div className={styles.mainContent}>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
        <ContactForm support_styles={styles}/>
        <FAQ question_answer_type_dict={question_answer_type_dict} support_styles={styles}/>
    </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;



