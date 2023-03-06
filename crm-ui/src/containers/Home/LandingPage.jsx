import React from "react";
import banner from '../../assets/images/banner-bg.png';
import bannerimage from '../../assets/images/crm-bann-icon.png';
import crmimage1 from '../../assets/images/crm-image1.png';
import crmimage2 from '../../assets/images/crm-image2.png';
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const ImageCard = styled(Card)`
text-align: center;
shadow: none
.circle{
    width: 50px;
    height: 50px;
    background-color: #f3ce33;
    border-radius: 50%;
    margin: auto;
    position: absolute;
}
.icons{
    width: 300px;
    height: 300px;
}
`

const HomeContent = styled.div`
.banner_div{
    height: 450px;
    object-fit: cover;
    overflow: hidden;
    // background-color: #e8f2f3;
    background:Url(${banner});
}
.banner_heading{
    // position:absolute;
    margin-top: 2%;
}
.card_circle{
    width: 80px;
    height: 80px; 
    color: #137da7;
    background-color: #edf2f6;
    border-radius: 50%;
    margin: auto;
    position: relative;
}
.card_icons{
    position: absolute;
    margin-top: 12px;
    height: 10px;
    width: 55px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
}
.card_titles{
    font-size: 16px;
    font-weight: bold; 
    color: #190c3a;
    margin: 15px 0px 10px 0px;
}
.card_text{
    font-size: 13px;
    color: #666;
    font-weight: 400;
    line-height: 20px;
}
.box_title{
    font-size: 35px;
    font-weight: bold;
    line-height: 40px;
    @media (max-width: 576px) {
        font-size: 30px !important;
    }
}
.grid_icons{
    background-color: #137da7;
    color: #fff;
    border-radius: 50%;
    font-size: 50px;
}
.h4-main {
    font-size: 18px
}
.logo-cls {
    border-radius: 4px;
}
.width-75 {
    width: 75%;
    @media (max-width: 576px) {
        width: 100% !important;
    }
}
.margin-tp-5 {
    margin-top: 4rem;
    @media (max-width: 576px) {
        margin-top: 2rem !important;
    }
}
.title-main {
    font-size: 2.3rem;
    font-family: Lato,sans-serif !important;
    font-weight: 800;
    color: #333 !important;
    text-transform: uppercase;
    line-height: 50px;
    @media (max-width: 576px) {
        font-size:25px !important;
    }
}
.btn-main {
    border: 0px;
    font-weight: 500;
    padding: 12px 24px;
    border-radius: 50px;
    margin: 0px;
    background-color: #2480ef;
}
`
const data = [{
    icons: <RouteOutlinedIcon sx={{ fontSize: "70px" }} />,
    title: "Strategy",
    text: "CRM in marketing is often game-changing, as it offers powerful insights, personalization, and testing opportunities that ultimately lead to increased sales."
},
{
    icons: <AccountTreeIcon sx={{ fontSize: "70px" }} />,
    title: "Mission",
    text: "Insights from your data can also help you increase revenue. For example, if you identify common purchase combinations, you can create packages or bundles to increase sales."
},
{
    icons: <QueuePlayNextIcon sx={{ fontSize: "70px" }} />,
    title: "Segmentation",
    text: "CRM makes sending the right message to the right person at the right time a reality. With your CRM connected to a sales and marketing automation tool."
},
{
    icons: <GroupsOutlinedIcon sx={{ fontSize: "70px" }} />,
    title: "Personalization",
    text: "Personalization offers a huge advantage in winning more business: 76% of consumers say that personalization prompted consideration of a brand."
},]


const LandingPage = () => {

    return (
        <HomeContent className="">
            <Box className="banner_div">

                <Box className="banner_heading d-flex">
                    <Container>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography className="margin-tp-5 title-main" variant="h4" sx={{ fontWeight: 'bold' }}>The complete CRM for startups and mid-sized Organizations</Typography>
                                <button className="btn btn-main btn-primary mt-4">Signin Now</button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <img src={bannerimage} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#137da7', height: '100px', width: '100%' }}></Box>
            <Container>
                <Box className="pb-4 p-0">
                    <Grid container spacing={4}>
                        {
                            data.map((det, index) => {
                                return (
                                    <Grid item className="pb-3" xs={12} md={3} key={index}>
                                        <ImageCard sx={{ p: 3, marginTop: "-50px" }}>
                                            <Box className="card_circle"><Box className="card_icons">{det.icons}</Box></Box>
                                            <Typography className="card_titles" sx={{ mt: 1 }}>{det.title}</Typography>
                                            <Typography className="card_text">{det.text}</Typography>
                                        </ImageCard>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Container>
            <Container className="mt-4 mb-5">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ color: 'gray', pb: 2 }}>About Us</Typography>
                        <Typography sx={{ pb: 2 }} className="box_title">We Provide High<br></br> Quality Services</Typography>
                        <Typography sx={{ color: 'gray' }}>Client management platforms like CRMs connect all the data from your sales leads and customers, all in one place. A CRM consolidates all communications (form fills, calls, emails, text messages, and meetings), documents, quotes, purchases, and tasks associated with each lead and client. Your entire team can access those details at the right time–to close a sale or deliver outstanding service.</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <img src={crmimage1} className="w-100" />
                    </Grid>
                    <Grid item className="mt-5 d-flex justify-center-center" xs={12} md={5}>
                        <img src={crmimage2} className="width-75" />
                    </Grid>
                    <Grid item className="" xs={12} md={7}>
                        <Grid container sx={{ p: 2 }}>
                            <Grid item className="margin-tp-5" xs={6} sx={{ textAlign: 'center' }}>
                                <SettingsIcon sx={{ p: 1 }} className="grid_icons mt-3" />
                                <Typography className="h4-main" sx={{ fontWeight: 'bold', mt: 2 }}>Prioritization</Typography>
                                <Typography sx={{ fontSize: '14px', color: 'gray', mt: 1 }}>A CRM helps the sales team prioritize their outreach efforts through lead scoring, which calculates a lead’s interest in your product or service. Leads with the highest lead scores are pushed to the top of the sales team’s tasks.</Typography>
                            </Grid>
                            <Grid item className="margin-tp-5" xs={6} sx={{ textAlign: 'center' }}>
                                <AttachMoneyIcon sx={{ p: 1 }} className="grid_icons mt-3" />
                                <Typography className="h4-main" sx={{ fontWeight: 'bold', mt: 2 }}>Better Revenue</Typography>
                                <Typography sx={{ fontSize: '14px', color: 'gray', mt: 1 }}>Amazing follow-up (and more sales) is made possible with a CRM. By automating follow-up with leads and clients, you no longer have to manage sticky notes on your desk or copy and paste the same email to every new lead.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* <Box className="container pt-4">
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ p: 4 }}>
                        <Box sx={{ pt: 3 }}>
                            <Typography sx={{ color: 'gray', pb: 2 }}>About Us</Typography>
                            <Typography sx={{ pb: 2 }} className="box_title">We Provide High<br></br> Quality Services</Typography>
                            <Typography sx={{ color: 'gray' }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ p: 4 }}>
                        <img src={crmimage1} className="w-100" />
                    </Grid>
                    <Grid item xs={6} sx={{ p: 4 }}>
                        <img src={crmimage2} className="w-75" />
                    </Grid>
                    <Grid item xs={5} sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid xs={5} sx={{ textAlign: 'center', m: 2 }}>
                                <SettingsIcon sx={{ p: 1 }} className="grid_icons" />
                                <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Banking Consulting</Typography>
                                <Typography sx={{ fontSize: '14px', color: 'gray', mt: 2 }}>Contrary to popular belief, Lorem Ipsum is not simply random text. </Typography>
                            </Grid>
                            <Grid xs={5} sx={{ textAlign: 'center', m: 2 }}>
                                <AttachMoneyIcon sx={{ p: 1 }} className="grid_icons" />
                                <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Learning with Finance</Typography>
                                <Typography sx={{ fontSize: '14px', color: 'gray', mt: 2 }}>Contrary to popular belief, Lorem Ipsum is not simply random text. </Typography>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>
            </Box> */}
        </HomeContent>
    )
}

export default LandingPage