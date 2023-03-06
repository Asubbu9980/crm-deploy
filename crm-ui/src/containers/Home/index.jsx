import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
// import { success } from '../../hooks/Toasters'
import Header from './Header'
import Footer from './Footer'

const Home = () => {
    // useEffect(() => {
    //   success('Hi toast!')
    // }, [])

    return (<Box>
        <Header />
        <Box pt={8}>
            <Outlet />
        </Box>
        <Footer />
    </Box>
    )
}

export default Home
