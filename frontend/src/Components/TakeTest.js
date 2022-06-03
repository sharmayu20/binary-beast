import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TestQuestions from './TestQuestions';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import PatientDetails from './PatientDetails';
const TakeTest = () => {
    let params = useParams();
    const [patientObj, setPatientObj] = useState({});
    const [testStarted, setTestStarted] = useState(false);

    useEffect(() => {
        //to be replaced by API calls
        if (params.healthId) {
            axios.get('/samplePatientList.json')
                .then(result => {
                    setPatientObj(result.data.filter(e => e.healthId == params.healthId)[0]);
                });
        }
    }, []);
    return <>{testStarted ?
        <TestQuestions /> :
        <Card className='review-details'>
            <CardContent>
                <Typography variant='h4'>
                    Please review the patient details and click on start test
                </Typography>
                <PatientDetails patientObj={patientObj} />
            </CardContent>
            <CardActions className='float-end'>
                <Button onClick={() => setTestStarted(true)}>Start test</Button>
            </CardActions>
        </Card>}
    </>;
}

export default TakeTest;