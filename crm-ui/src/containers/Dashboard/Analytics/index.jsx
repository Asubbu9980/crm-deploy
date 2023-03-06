import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ClientsAnalytics from './ClientsAnalytics';
import TeamsAnalytics from './TeamsAnalytics';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity2Icon from '@mui/icons-material/Diversity2';

const HeaderIcons = {
  fontSize: 75,
  color: 'primary.main',
  '@media(max-width: 1180px)': {
    fontSize: '55px !important'
  },
  '@media(max-width: 890px)': {
    fontSize: '75px !important'
  }
}

const Analytics = () => {

  return (
    <Box>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    <PeopleIcon sx={HeaderIcons} />
                  </Grid>
                  <Grid item xs={8} >
                    <Typography variant="h5" > Clients </Typography>
                    <Typography variant="h4" fontWeight={500} > 1000 </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    <GroupsIcon sx={HeaderIcons} />
                  </Grid>
                  <Grid item xs={8} >
                    <Typography variant="h5" > Employees </Typography>
                    <Typography variant="h4" fontWeight={500} > 700 </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    <Diversity2Icon sx={HeaderIcons} />
                  </Grid>
                  <Grid item xs={8} >
                    <Typography variant="h5" > Teams </Typography>
                    <Typography variant="h4" fontWeight={500} > 500 </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Box height={330}>
                  <TeamsAnalytics />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Box height={330} m={'auto'}>
                  <ClientsAnalytics />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}

export default Analytics;
