import React, { useEffect, useState } from 'react';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { AppBar } from 'src/components/StyledComponents/Dashboard';
import CrmProfile from 'src/components/Profie';
import { useAppContext } from 'src/context/AppContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CrmLogo from 'src/components/Logo'; 


const Topbar = (props) => {
    const { expandSidebar, setExpandSidebar } = props;
    const { appState: { employee } } = useAppContext();


    return (
        <AppBar position="fixed" open={expandSidebar}>
            <Toolbar>
                <IconButton className="text-white" size="large" aria-label="open drawer" edge="start"
                    onClick={() => { setExpandSidebar(!expandSidebar) }}
                    sx={{ marginRight: 2 }} >
                    {expandSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                {expandSidebar ? '' : <CrmLogo redirectTo="/dashboard/analytics" />}
                <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                    <CrmProfile username={employee?.employeeName} showMenu={true} imageUrl={employee?.photoUrl} showProfileName={false} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

Topbar.propTypes = {
    expandSidebar: PropTypes.bool,
    setExpandSidebar: PropTypes.func
};

export default Topbar;



