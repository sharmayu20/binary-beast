import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorDataTable from './DoctorDataTable';
import { Button, Divider, FormControl, IconButton, Input } from '@mui/material';
import SearchedOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Dashboard2 = () => {
    let navigate = useNavigate();

    const navigateToPatientRegistration = () => {
        navigate('/registerPatient');
    }

    return <div className='container-fluid m-1'>
        <div className='row'>
            <div className='col-md-3 clinic-details'>
                <h3>Clinic Details</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Clinic name:</td>
                            <td>Binary beast clinic</td>
                        </tr>
                        <tr>
                            <td>Clinic Address:</td>
                            <td>123 Test road, India</td>
                        </tr>
                        <tr>
                            <td>Total Test Conducted:</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
                <Divider>Clinic Description</Divider>
                The binary beast clinic provides assistance to the user to go through the mental health questionnaire in order to consult them through health professionals if required.
            </div>
            <div className='col-md-9'>
                <div className='row'>
                    <div className='col-12'>
                        <Button className='btn-success float-end' onClick={navigateToPatientRegistration} variant='contained' color='success'>
                            Register New Doctor
                        </Button>
                    </div>
                    <div className='col-12'>
                        <FormControl margin='normal'>
                            <Input id='search' name='search'
                                type='search'
                                startAdornment={
                                    <IconButton>
                                        <SearchedOutlinedIcon />
                                    </IconButton>
                                }
                                placeholder='Search'
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='row data-table'>
                    <DoctorDataTable />
                </div>
            </div>
        </div>
    </div>;
}

export default Dashboard2;