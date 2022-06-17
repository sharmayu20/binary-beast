import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Common/Loader';
import DoctorDetails from './DoctorDetails';
import { Button, Card, Typography } from '@mui/material';

const DoctorProfile = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    const [doctorObj, setDoctorObj] = useState({});

    const navigateToConsultation = (doctorId) => {
        navigate(`/consultation`);
    }
    useEffect(() => {
        //to be replaced by API calls
        axios.get('/sampleDoctorList.json')
            .then(result => {
                setDoctorObj(result.data.filter(e => e.doctorId == params.doctorId)[0]);
            })
    }, []);

    return <div>
        <Card className='details'>
            <Typography variant='h5'>
                Doctor Profile
            </Typography>
            {Object.keys(doctorObj).length === 0 ? <Loader /> :
                <div>
                    <DoctorDetails doctorObj={doctorObj} />
                    <Button onClick={() => navigateToConsultation(doctorObj.doctorId)} variant='contained' className='m-2'>Book A Slot</Button>
                </div>}
        </Card>
    </div>;
}

export default DoctorProfile;