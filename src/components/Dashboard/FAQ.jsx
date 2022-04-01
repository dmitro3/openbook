import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box"

export const FAQ = (props) =>{
    let styles = props.support_styles;
    return (
        <section className="faqs-section faqs-page">
        <div className={`overlay  ${styles.pt120}`}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-7">
                        <div className="section-header text-center">
                            <h5 className={styles.subTitle}>Frequently Asked Questions</h5>
                            <h2 className={styles.title}>If you have questions we have answer</h2>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <ul className={`nav  ${styles.navBorder}`} role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`${styles.active} ${styles.tabButton}`} id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">OpenBook</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`${styles.tabButton}`} id="affiliate-tab" data-bs-toggle="tab" data-bs-target="#affiliate" type="button" role="tab" aria-controls="affiliate" aria-selected="false">Crypto</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`${styles.tabButton}`} id="sports-tab" data-bs-toggle="tab" data-bs-target="#sports" type="button" role="tab" aria-controls="sports" aria-selected="false">Betting</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`${styles.tabButton}`} id="tournament-tab" data-bs-toggle="tab" data-bs-target="#tournament" type="button" role="tab" aria-controls="tournament" aria-selected="false">Bookies</button>
                        </li>
                    </ul>
                </div>
                {props.question_answer_type_dict.map((qat,index)=>{
                    return (
                            <Box key={index} className="row d-flex justify-content-center" sx={{paddingTop:'10px'}}>
                                <div className="col-xl-10">
                                    <div className="faq-box">
                                        <Accordion lassName="accordion">
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
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
                                    </div>
                                </div>
                            </Box>
                    )
                })}

            </div>
        </div>
    </section>
    )

}