import React from 'react'
import { Card, CardContent, Divider, Grid, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types';


const headerTerm = {
    whiteSpace: 'nowrap',
    fontWeight: 600
}

const contentTerm = {
    whiteSpace: 'pre-wrap',
    marginLeft: 2,
    wordBreak: 'break-all'
}

const ProfessionalDetails = (props) => {
    const { employee } = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" > Professional Details </Typography>
                <Divider><Typography variant="h6">{employee?.employeeName}</Typography></Divider>
                <Box mt={2}>
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={6} >
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Company : </Typography>
                                <Typography sx={contentTerm}>{employee?.companyName}</Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Employee ID : </Typography>
                                <Typography sx={contentTerm}>{employee?.employeeCode || 'N/A'}</Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Department : </Typography>
                                <Typography sx={contentTerm}>{employee?.department || 'N/A'}</Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Designation : </Typography>
                                <Typography sx={contentTerm}>{employee?.designation || 'N/A'}</Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm} >Manager Name : </Typography>
                                <Typography sx={contentTerm} >{employee?.manager?.name || 'N/A'}</Typography>
                            </Box>
                            <Box display={'flex'} mb={2}>
                                <Typography sx={headerTerm}>Manager Email : </Typography>
                                <Typography sx={contentTerm}>{employee?.manager?.email || 'N/A'}</Typography>
                            </Box>


                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

ProfessionalDetails.propTypes = {
    employee: PropTypes.object,
};


export default ProfessionalDetails;