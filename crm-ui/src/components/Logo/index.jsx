import React from 'react'
import { Box } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LOGO from 'src/assets/images/JNIT-logo.jpg'

const Logo = styled(Box)`
      margin-right: 1.5rem;
      display: flex;
      font-weight: 700;
      font-size: 1.3rem;
      text-decoration: none;
      color: black;,
      .logo-cls{
        border-radius:4px;
      }
`

const CrmLogo = (props) => {
    const { height = 55, redirectTo = '/' } = props;
    return (
        <Logo component="a" href={redirectTo} >
            <img className={'logo-cls'} src={LOGO} alt="CRM-LOGO" height={height} />
        </Logo>
    )
}

CrmLogo.propTypes = {
    height: PropTypes.number,
    redirectTo: PropTypes.string,
}

export default CrmLogo;
