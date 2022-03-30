import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "@components/DashboardLayout";
import styles from '@styles/support.module.css';

const Dashboard = (props) => 
{  
    return (
    <>
    <Head>
        <title>Support | OpenEdge</title>
    </Head>
        <Box>
        <section className={`${styles.bannerSection} ${styles.innerBanner} ${styles.contact}`}>
        <div className={`${styles.overlay}`}>
            <div className={`${styles.shadedArea}`}>
                <img src="https://pixner.net/bitbetio/main/assets/images/contact-illus.png" className={`${styles.backgroundImg}`} alt="image"/>
            </div>
            <div className={styles.bannerContent}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className="col-lg-9 col-md-10">
                            <div className={styles.mainContent}>
                                <h1 className={styles.mainContentText}>Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="faqs-section faqs-page">
        <div class="overlay pt-120">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-7">
                        <div class="section-header text-center">
                            <h5 class="sub-title">Frequently Asked Questions</h5>
                            <h2 class="title">If you have questions we have answer</h2>
                            <p>Answers for our most popular questions about sportsbetting, crypto, and bitbetio</p>
                        </div>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade" id="affiliate" role="tabpanel" aria-labelledby="affiliate-tab">
                        <div class="row d-flex justify-content-center">
                            <div class="col-xl-10">
                                <div class="faq-box">
                                    <div class="accordion" id="accordionFaqsAffiliate">
                                        <div class="accordion-item">
                                            <h5 class="accordion-header" id="headingAffiliateOne">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAffiliateOne" aria-expanded="false" aria-controls="collapseAffiliateOne">
                                                    I want2 to play at Bitbetio, What do i need to do?
                                                </button>
                                            </h5>
                                            <div id="collapseAffiliateOne" class="accordion-collapse collapse" aria-labelledby="headingAffiliateOne" data-bs-parent="#accordionFaqsAffiliate">
                                                <div class="accordion-body">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy
                                                        text ever
                                                        since the 1500s, when an unknown printer took a galley of type
                                                        and
                                                        scrambled it to make a type specimen book.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
            
        </Box>
    </>
)};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;



