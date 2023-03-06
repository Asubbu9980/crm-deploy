import React from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Drawer, DrawerHeader } from '../../components/StyledComponents/Dashboard';
import { useAppContext } from 'src/context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

import CrmProfile from 'src/components/Profie';
import CrmLogo from 'src/components/Logo';

//Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';


const listItemButtonStyle = (expandSidebar) => {
  return {
    minHeight: 48,
    justifyContent: expandSidebar ? 'initial' : 'center',
    px: 2.5,
  }
}

const listItemButtonIconsStyle = (expandSidebar) => {
  return {
    minWidth: 0,
    mr: expandSidebar ? 3 : 'auto',
    justifyContent: 'center',
  }
}

const isSelected = (theme) => {
  return {
    border: `1px solid ${theme.palette.primary.main}`,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    boxShadow: `0px 0px 2px ${theme.palette.primary.main}`,
    color: theme.palette.primary.main
  }
}

const Sidenav = (props) => {
  const { expandSidebar, setExpandSidebar } = props;
  const { appState: { employee } } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const getRootIcons = (path = '') => {
    let icon = null;
    switch (path) {
      case '/dashboard/analytics': icon = <BarChartIcon />; break;
      case '/dashboard/clients': icon = <PeopleIcon />; break;
      case '/dashboard/bdmclients': icon = <PeopleIcon />; break;
      case '/dashboard/employees': icon = <BadgeIcon />; break;
      default: icon = <FeaturedPlayListIcon />; break;
    }
    return icon;
  }


  return (
    <Drawer variant="permanent" open={expandSidebar} className={'smallscrollbar'}>
      <DrawerHeader >
        <CrmLogo redirectTo="/dashboard/analytics" />
      </DrawerHeader>
      <Divider />
      <Box pt={2} pb={expandSidebar ? 0 : 2}>
        <CrmProfile username={employee?.employeeName} employeeCode={employee?.employeeCode} imageUrl={employee?.photoUrl}
          width={expandSidebar ? 80 : 50} height={expandSidebar ? 80 : 50} radius={200} showMenu={false}
          backgroundColor={theme.palette.primary.main} textColor={'#fff'}
          fontSize={expandSidebar ? 30 : 20} showProfileName={expandSidebar} />
      </Box>
      <Divider />
      <List>
        {employee && employee.roots &&
          employee.roots.map((root, index) => (
            <ListItem key={index} disablePadding sx={(root.path === location.pathname) ? isSelected(theme) : {}}
              onClick={() => { navigate(root.path) }} >
              <ListItemButton sx={listItemButtonStyle(expandSidebar)} >
                <ListItemIcon sx={listItemButtonIconsStyle(expandSidebar)} >
                  <Tooltip title={root.title} placement={'right-end'}>{getRootIcons(root.path)}</Tooltip>
                </ListItemIcon>
                <ListItemText primary={root.title} sx={{ opacity: expandSidebar ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  )
}

Sidenav.propTypes = {
  expandSidebar: PropTypes.bool,
  setExpandSidebar: PropTypes.func
};

export default Sidenav;


