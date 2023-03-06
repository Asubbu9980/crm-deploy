import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CrmLogo from 'src/components/Logo';

const NavLink = styled(Link)`
    display: block;
    text-decoration: none;
    font-weight: 500;
    color: #43464b;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #43464b;
    margin: 0px;
    line-height: 15px;
    background-color: #e8f2f3;
      &:hover{
            color: #fff;
            border: 1px solid #137da7;
            background-color: #137da7;
      }
      &.selected{
        border-bottom: 3px double #fff;
      }
`

const Header = (props) => {
    const location = useLocation();

    return (
        <>
            <Box>
                <AppBar color={'inherit'} position="fixed" >
                    <Container className='p-0'>
                        <Toolbar className='container' sx={{ height: 65 }}>
                            <CrmLogo />
                            <Box ml={'auto'} display={'flex'}>
                                <NavLink to={"/login"} className={(location.pathname === '/login') ? 'selected' : ''}>Login</NavLink>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;
