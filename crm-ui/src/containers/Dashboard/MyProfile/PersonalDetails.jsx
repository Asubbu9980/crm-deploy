import React from 'react'
import { Card, CardContent, Divider, Grid, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types';
import moment from 'moment/moment';


const headerTerm = {
    whiteSpace: 'nowrap',
    fontWeight: 600
}

const contentTerm = {
    whiteSpace: 'pre-wrap',
    marginLeft: 2,
    wordBreak: 'break-all'
}

const PersonalDetails = (props) => {
    const { employee } = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" > Personal Details </Typography>
                <Divider><Typography variant="h6">{employee?.employeeName}</Typography></Divider>
                <Box mt={2}>
                    <Grid container spacing={3} >
                        <Grid item xs={6} >
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Gender : </Typography>
                                <Typography sx={contentTerm}>{employee?.gender || 'N/A'}</Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Date Of Birth: </Typography>
                                <Typography sx={contentTerm}>
                                    {employee?.dob ? moment(employee?.dob).format('l') : 'N/A'}
                                </Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Marital Status : </Typography>
                                <Typography sx={contentTerm}>{employee?.maritalStatus || 'N/A'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm} >Address : </Typography>
                                <Typography sx={contentTerm} >{employee?.address || 'N/A'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

PersonalDetails.propTypes = {
    employee: PropTypes.object,
};


export default PersonalDetails;