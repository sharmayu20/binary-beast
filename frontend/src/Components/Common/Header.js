import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    let navigate = useNavigate();
    const navigateToLoginPage = () => {
        navigate('/login');
    }
    const navigateToHome = () => {
        navigate('/');
    }
    const logout = () => {
        props.authenticate();
        navigate('/');
    }
    return <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={navigateToHome}>
                HEALTH APP
            </Typography>
            {props.isLoggedIn ?
                <Button color='inherit' onClick={logout}>Logout</Button> :
                <Button color='inherit' onClick={navigateToLoginPage}>Login/Sign up</Button>}
        </Toolbar>
    </AppBar>;
}

export default Header;