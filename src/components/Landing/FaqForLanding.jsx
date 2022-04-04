import {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
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

export const FaqForLanding = (props) =>{
    let [tabState,setTabState] = useState("OpenBook");

    const handleTabButtonClick = (e) => {
        setTabState(e.target.value);
    }
    let styles = props.landing_sytles;
    return (
        <section>
        <div className={`${styles.overlay}  ${styles.pt120}`}>
            <div className={`${styles.container}`}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{"flex":"0 0 auto","width":"58.3333333333%"}}>
                        <div style={{justifyContent:'center',textAlign:'center'}}>
                            <h5 className={styles.subTitle}>Frequently Asked Questions</h5>
                            <h2 className={styles.title}>If you have questions we have answer</h2>
                        </div>
                    </div>
                </div>
                <Box style={{display:'flex',justifyContent:'center'}}>
                    <ul className={`${styles.navBorder}`}>
                        <li>
                            <button className={`${styles.tabButton} ${tabState == "OpenBook" ? styles.active : void(10)}`} value="OpenBook" onClick={(e)=>handleTabButtonClick(e)}>OpenBook</button>
                        </li>
                        <li >
                            <button className={`${styles.tabButton} ${tabState == "crypto" ? styles.active : void(10)}`} value="crypto" onClick={(e)=>handleTabButtonClick(e)}>Crypto</button>
                        </li>
                        <li >
                            <button className={`${styles.tabButton} ${tabState == "betting" ? styles.active : void(10)}`} value="betting" onClick={(e)=>handleTabButtonClick(e)}>Betting</button>
                        </li>
                        <li>
                            <button className={`${styles.tabButton} ${tabState == "bookies" ? styles.active : void(10)}`} value="bookies" onClick={(e)=>handleTabButtonClick(e)}>Bookies</button>
                        </li>
                    </ul>
                </Box>
                {question_answer_type_dict.map((qat,index)=>{
                    return (
                        <Box key={index} className={`${styles.row} ${qat.type != tabState ? styles.faq_hidden : void(10)}`} type={qat.type}>
                            <Box sx={{"flex":"0 0 auto","width":"83.3333333333%"}}>
                                <Accordion sx={{backgroundColor:'#3a2fa4',color:'white'}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        >
                                        <Typography sx={{fontSize: '1.5rem'}}>{qat.question}</Typography>
                                        </AccordionSummary>
                                        <Box sx={{borderBottom:'1px solid #cbcbcb',width:'98%',marginLeft:'auto',marginRight:'auto'}}/>
                                        <AccordionDetails>
                                        <Typography>
                                        {qat.answer}
                                        </Typography>
                                        </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                    )
                })}


            </div>
        </div>
    </section>
    )

}