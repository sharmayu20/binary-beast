import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material';

const PatientRegistration = () => {
    const [formValues, setFormValues] = useState({
        patientName: '',
        age: ''
    });
    const register = () => {
    }
    const handleChange = (event) => {
        setFormValues({ ...formValues, [event.target.id]: event.target.value });
    }
    return <Paper className='login-form'>
        <Typography>Patient Registration Form </Typography>
        <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='patientName'>Patient name</InputLabel>
            <Input id='patientName' name='patientName'
                autoFocus value={formValues.patientName}
                onChange={handleChange} />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='age'>Age</InputLabel>
            <Input id='age' name='age'
                type='number'
                value={formValues.age}
                onChange={handleChange} />
        </FormControl>
        <Button onClick={register} variant='outlined' className='m-4'>Register</Button>
    </Paper>;
}

export default PatientRegistration;