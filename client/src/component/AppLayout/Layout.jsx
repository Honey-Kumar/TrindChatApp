import React from 'react'
import Header from './Header'
import Footer from './Footer'
import PageTitle from '../Shared/PageTitle'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Profile from '../Profile';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


const Layout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <PageTitle />
                <Header />
                <Box sx={{ flexGrow: 1, width: "100vw" }}>
                    <Grid container sx={{ minHeight: '100vh' }}>
                        <Grid item sm={3} md={3}>
                            <Item sx={{ height: '100%', display: { xs: 'none', md: 'block', sm: 'block' } }}>First</Item>
                        </Grid>
                        <Grid item sm={6} xs={12} md={6}>
                            <Item sx={{ height: '100%', display: { xs: 'block', md: 'block', sm: 'block' } }}>Second</Item>
                        </Grid>
                        <Grid item sm={3} md={3}>
                            <Item sx={{ height: '100%', display: { xs: 'none', md: 'block', sm: 'block' }, bgcolor: '#1F55B3', color: 'white' }}>
                                <Profile />
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </>
        )
    }
}

export default Layout
