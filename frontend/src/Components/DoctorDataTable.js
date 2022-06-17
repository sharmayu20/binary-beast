import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Loader from './Common/Loader';

const DoctorDataTable = () => {
    let navigate = useNavigate();
    const [DoctorList, setDoctorList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        //to be replaced by API calls
        axios.get('sampleDoctorList.json')
            .then(result => {
                setDoctorList(result.data);
                setIsLoaded(true);
            }).catch(err => {
                setIsLoaded(true);
            });
    });
    const navigateToDoctorProfile = (doctorId) => {
        navigate(`/doctorProfile/${doctorId}`);
    }
    const navigateToConsultation = (doctorId) => {
        navigate(`/consultation`);
    }
    const columns = [
        { field: 'doctorId', headerName: 'Doctor Id' },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'available', headerName: 'Availability', width: 140 },
        {
            field: 'action', headerName: '',
            width: 'auto',
            sortable: 'false',
            renderCell: (params) => {
                return <div>
                    <Button variant='contained' classname='m-1' startIcon={<AccountCircleOutlinedIcon />} onClick={() => navigateToDoctorProfile(params.row.doctorId)}>View profile</Button>
                    <Button variant='contained' classname='m-1' startIcon={<QuizIcon />} onClick={() => navigateToConsultation(params.row.doctorId)}>Book A Slot</Button>
                </div>
            }
        }
    ]
    return <>
        {isLoaded ? <DataGrid
            rows={DoctorList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
        /> :
            <Loader />}
    </>;
}

export default DoctorDataTable;