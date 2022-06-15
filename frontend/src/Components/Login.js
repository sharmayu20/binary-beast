import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel, Paper, Tabs, Tab, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [loginFormValues, setLoginFormValues] = useState({
        username: '',
        password: ''
    });
    const [signupFormValues, setSignupFormValues] = useState({
        clinicName: '',
        username: '',
        address: '',
        description: '',
        password: '',
        reEnterPassword: ''
    });
    const [tabValue, setTabValue] = useState('login');
    const [isSignedUp, setIsSignedUp] = useState(false);

    useEffect(() => {
        setLoginFormValues({
            username: '',
            password: ''
        });
        setSignupFormValues({
            clinicName: '',
            username: '',
            address: '',
            description: '',
            password: '',
            reEnterPassword: ''
        });
    }, [tabValue]);
    const login = () => {
        props.authenticate();
        navigate('/dashboard');
    }
    const handleChange = (event) => {
        tabValue === 'login' ?
            setLoginFormValues({ ...loginFormValues, [event.target.id]: event.target.value })
            :
            setSignupFormValues({ ...signupFormValues, [event.target.id]: event.target.value });
    }
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }
    const signUp = () => {
        setSignupFormValues({
            clinicName: '',
            username: '',
            address: '',
            description: '',
            password: '',
            reEnterPassword: ''
        });
        setIsSignedUp(true);
    }
    return <Paper className='login-form'>
        <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label='LOGIN' value='login'></Tab>
            <Tab label='SIGN UP' value='signup'></Tab>
        </Tabs>
        {tabValue === 'login' ?
            <div className='mt-2'>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input id='username' name='username'
                        value={loginFormValues.username}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input id='password' name='password' type='password'
                        value={loginFormValues.password}
                        onChange={handleChange} />
                </FormControl>
            </div> :
            <div className='mt-2'>
                {isSignedUp && <Alert severity="success" action={
                    <Button color="inherit" size="small" onClick={() => setTabValue('login')}>
                        Login
                    </Button>
                }>User Signed up successfully </Alert>}
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='clinicName'>Clinic name</InputLabel>
                    <Input id='clinicName' name='clinicName'
                        autoFocus value={signupFormValues.clinicName}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input id='username' name='username'
                        value={signupFormValues.username}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='address'>Address</InputLabel>
                    <Input id='address' name='address'
                        value={signupFormValues.address}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input id='description' name='description'
                        value={signupFormValues.description}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input id='password' name='password' type='password'
                        value={signupFormValues.password}
                        onChange={handleChange} />
                </FormControl>
                <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='reEnterPassword'>Re-enter password</InputLabel>
                    <Input id='reEnterPassword' name='reEnterPassword' type='password'
                        value={signupFormValues.reEnterPassword}
                        onChange={handleChange} />
                </FormControl>
            </div>}
        {tabValue === 'login' ?
            <Button onClick={login} variant='outlined' className='m-4' disabled={loginFormValues.username === '' && loginFormValues.password === ''}>Login</Button> :
            <Button onClick={signUp} variant='outlined' className='m-4'>Sign up</Button>
        }
    </Paper>;
}

export default Login;