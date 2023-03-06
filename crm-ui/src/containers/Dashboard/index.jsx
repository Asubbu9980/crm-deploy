import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Box } from '@mui/material';
import Topbar from './Topbar';
import Sidenav from './Sidenav';
import { DrawerHeader } from '../../components/StyledComponents/Dashboard';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLoginData, getStaticData } from 'src/apis/employees';
import { useAppContext } from 'src/context/AppContext';
import { error } from 'src/hooks/Toasters';
import { useAppLoaderContext } from 'src/context/LoaderContext';

const Dashboard = () => {
  const [expandSidebar, setExpandSidebar] = useState(window.innerWidth > 1025 ? true : false);
  const { startLoading } = useAppLoaderContext();
  const { appState: { employee }, setEmployee, setStatics } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser();
  }, [])

  useEffect(() => {
    if (employee?.employeeCode) {
      getStatics();
    }
  }, [employee?.employeeCode]);

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setExpandSidebar(window.innerWidth > 1025 ? true : false);
    });
  }, [])

  const getLoggedInUser = () => {
    startLoading(true);
    getLoginData().then(res => {
      if (res.status === 200) {
        setEmployee(res.data);
      } else {
        error('Please Login!.')
        navigate('/login')
      }
      startLoading(false);
    });
  }

  const getStatics = () => {
    getStaticData().then(res => {
      if (res.status === 200) {
        setStatics(res.data);
      }
    });
  }



  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f1f3f4' }}>
      <Topbar expandSidebar={expandSidebar} setExpandSidebar={setExpandSidebar} />
      <Sidenav expandSidebar={expandSidebar} setExpandSidebar={setExpandSidebar} />
      <Box component="main" sx={{ p: 2, transition: '0.4s', width: `calc(100vw - ${expandSidebar ? '240px' : '65px'})` }}>
        <DrawerHeader />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}


export default Dashboard;