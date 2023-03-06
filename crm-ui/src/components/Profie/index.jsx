import React from 'react'
import { Box, MenuItem, Menu, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from 'src/context/AppContext';
import { useTheme } from '@mui/material/styles';

const profileBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontWeight: 600,
}

function CrmProfile(props) {
  const { username, employeeCode, imageUrl = '', showMenu = true, width = 40, height = 40, radius = 50,
    fontSize = 18, backgroundColor = '#fff', textColor = '#000', showProfileName = true } = props;
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  const prepareUserName = (uname = '') => {
    let nameLetters = '';
    let names = uname.split(" ").slice(0, 2);
    names.forEach(name => {
      nameLetters += name.slice(0, 1);
    })
    return nameLetters
  }

  const myprofile = () => {
    setAnchorEl(null);
    navigate('/dashboard/myprofile');
  }


  return (
    <div>
      <Box mx={'auto'} width={width} height={height} borderRadius={radius} fontSize={fontSize}
        backgroundColor={backgroundColor} color={textColor}
        onClick={showMenu ? handleClick : () => { }}
        sx={profileBox} >
        {imageUrl ? (
          <img src={imageUrl} alt={'Invalid profile url'} width={'100%'} height={'100%'} />
        ) : (
          prepareUserName(username)
        )
        }
      </Box>

      {showProfileName &&
        <Box p={2} textAlign={'center'}>
          <Typography variant="h6" sx={{ whiteSpace: 'pre-wrap' }}> {username} </Typography>
          <Typography variant="h6" color={theme.palette.primary.light} > {employeeCode} </Typography>
        </Box>
      }

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem divider>{username}</MenuItem>
        <MenuItem onClick={myprofile}>My Profile</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}


CrmProfile.propTypes = {
  username: PropTypes.string,
  employeeCode: PropTypes.string,
  imageUrl: PropTypes.string,
  showMenu: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  showProfileName: PropTypes.bool,
};

export default CrmProfile






