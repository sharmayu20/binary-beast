import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Common/Loader';
import PatientDetails from './PatientDetails';
import { Button, Card, Typography } from '@mui/material';

const PatientProfile = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    const [patientObj, setPatientObj] = useState({});

    const navigateToTakeTest = (healthId) => {
        navigate(`/takeTest/${healthId}`);
    }
    useEffect(() => {
        //to be replaced by API calls
        axios.get('/samplePatientList.json')
            .then(result => {
                setPatientObj(result.data.filter(e => e.healthId == params.healthId)[0]);
            })
    }, []);

    return <div>
        <Card className='details'>
            <Typography variant='h5'>
                Patient Profile
            </Typography>
            {Object.keys(patientObj).length === 0 ? <Loader /> :
                <div>
                    <PatientDetails patientObj={patientObj} />
                    <Button onClick={() => navigateToTakeTest(patientObj.healthId)} variant='contained' className='m-2'>{patientObj.lastTestedOn === '' ? 'Take test' : 'Take test again'}</Button>
                </div>}
        </Card>
    </div>;
}

export default PatientProfile;