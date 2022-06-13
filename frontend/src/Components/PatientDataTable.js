import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Loader from './Common/Loader';

const PatientDataTable = () => {
    let navigate = useNavigate();
    const [patientList, setPatientList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        //to be replaced by API calls
        axios.get('samplePatientList.json')
            .then(result => {
                setPatientList(result.data);
                setIsLoaded(true);
            }).catch(err => {
                setIsLoaded(true);
            });
    });
    const navigateToPatientProfile = (healthId) => {
        navigate(`/patientProfile/${healthId}`);
    }
    const navigateToTakeTest = (healthId) => {
        navigate(`/takeTest/${healthId}`);
    }
    const columns = [
        { field: 'healthId', headerName: 'Health Id' },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'lastTestedOn', headerName: 'Last tested on', width: 140 },
        {
            field: 'action', headerName: '',
            width: 'auto',
            sortable: 'false',
            renderCell: (params) => {
                return <div>
                    <Button variant='contained' classname='m-1' startIcon={<AccountCircleOutlinedIcon />} onClick={() => navigateToPatientProfile(params.row.healthId)}>View profile</Button>
                    <Button variant='contained' classname='m-1' startIcon={<QuizIcon />} onClick={() => navigateToTakeTest(params.row.healthId)}>{params.row.lastTestedOn === '' ? 'Take test' : 'Take test again'}</Button>
                </div>
            }
        }
    ]
    return <>
        {isLoaded ? <DataGrid
            rows={patientList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
        /> :
            <Loader />}
    </>;
}

export default PatientDataTable;