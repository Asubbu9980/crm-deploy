import React from 'react'
import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { useAppContext } from 'src/context/AppContext';
import CrmProfile from 'src/components/Profie';
import { useTheme } from '@mui/material/styles';
import Email from '@mui/icons-material/Email';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ProfessionalDetails from './ProfessionalDetails';
import Skills from './Skills';
import PersonalDetails from './PersonalDetails';

const textStyle ={
   wordBreak: 'break-all'
}

const MyProfile = () => {

    const { appState: { employee } } = useAppContext()
    const theme = useTheme();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent className='pb-0'>
                            <CrmProfile username={employee?.employeeName} employeeCode={employee?.employeeCode} imageUrl={employee?.photoUrl}
                                width={80} height={80} radius={200} showMenu={false}
                                backgroundColor={theme.palette.primary.main} textColor={'#fff'}
                                fontSize={30} showProfileName={true} />
                        </CardContent>
                        <CardContent>
                            <Box py={3} borderTop={'1px solid lightgray'} borderBottom={'1px solid lightgray'}>
                                <Typography mb={2} sx={textStyle}>
                                    <Email /> {employee?.email}
                                </Typography>
                                <Typography sx={textStyle}>
                                    <StayCurrentPortraitIcon /> {employee?.mobile}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Box marginX={'auto'} pb={3} display={'flex'} >
                                <Box marginX={1}>
                                    <IconButton color="inherit" >
                                        <FacebookIcon />
                                    </IconButton>
                                </Box>
                                <Box marginX={1}>
                                    <IconButton color="inherit" >
                                        <TwitterIcon />
                                    </IconButton>
                                </Box>
                                <Box marginX={1}>
                                    <IconButton color="inherit" >
                                        <LinkedInIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ProfessionalDetails employee={employee} />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Skills employee={employee} />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <PersonalDetails employee={employee} />
                        </Grid> */}
                    </Grid>

                </Grid>
            </Grid>

        </Box>
    )
}

export default MyProfile;
