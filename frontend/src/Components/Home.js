import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Home = (props) => {
    let navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate('/dashboard');
    }
    return <div className='row'>
        <div className="title-background">
            <div className="bg"></div>
            <div className="align-center">
                <div className="title-text">
                    <Typography variant='h4' className='animate-text'>WOMEN HEALTH IN RURAL AREAS</Typography>
                </div>
            </div>
        </div>
        {props.isLoggedIn && <div className='col-12'>
            <Button className='btn-success float-end m-2' onClick={navigateToDashboard} variant='contained' color='success'>
                Go to Dashboard
            </Button>
        </div>}
        <div className='col-md-8 col-12 m-auto mt-2'>
            <Paper className='p-3 bg-light'>
                <h6>
                    <PsychologyIcon /> Addressing the issue of bringing mental healthcare into Rural mainstream, starting with Acceptability, Availability and Accessibility.
                </h6>
                <p>
                    A platform accessible to the people through local health centers, where we provide the initial diagnosis using rightly sourced questionnaire to predict the level of mental illness on a DASS s (Depression Anxiety Stress Scales)
                </p>
            </Paper>
        </div>
        <div className='col-md-8 col-12 m-auto mt-2'>
            <Paper className='p-3 bg-light'>
                <h6>
                    <LocalHospitalIcon /> Connecting the people with the right health professional(Psychiatrists if needed) through e-consultations supported by the clinics through voice calls and video calls.
                </h6>
            </Paper>
        </div>
    </div>;
}

export default Home;