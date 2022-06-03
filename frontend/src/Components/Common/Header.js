import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate();
    const navigateToLoginPage = () => {
        navigate('/login');
    }
    const navigateToDashboard = () => {
        navigate('/dashboard');
    }
    return <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={navigateToDashboard}>
                HEALTH APP
            </Typography>
            <Button color='inherit' onClick={navigateToLoginPage}>Login/Sign up</Button>
        </Toolbar>
    </AppBar>;
}

export default Header;