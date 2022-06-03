import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDataTable from './PatientDataTable';
import { Button, FormControl, IconButton, Input } from '@mui/material';
import SearchedOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Dashboard = () => {
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
                            <td>Clinic name</td>
                            <td>Test clinic</td>
                        </tr>
                        <tr>
                            <td>Total Test Conducted</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='col-md-9'>
                <div className='row'>
                    <div className='col-12'>
                        <Button className='btn-success float-end' onClick={navigateToPatientRegistration} variant='contained' color='success'>
                            Register New Patient
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
                    <PatientDataTable />
                </div>
            </div>
        </div>
    </div>;
}

export default Dashboard;