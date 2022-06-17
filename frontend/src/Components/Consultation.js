import React, { useState } from 'react';
// import DtPicker from 'react-calendar-datetime-picker'
// import 'react-calendar-datetime-picker/dist/index.css'
import { Button, Dialog, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { TimePicker, DesktopDatePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const Consultation = () => {
    let navigate = useNavigate();
    const [showResponse, setShowResponse] = useState(false);
    const submitBooking = () => {
        setShowResponse(true);
    }
    const navigateToDashboard = () => {

        navigate('/dashboard');


    }

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    //    const [date, setDate] = useState(null)
    //   return (
    //     <DtPicker
    //       onChange={setDate}
    //       withTime
    //       showTimeInput //just show time in input

    //     />
    //   );
    return <>{

        <div>
           

            {/* <DtPicker
    onChange={setDate}
    withTime
    placeholder='Select Appointment Date and Time'
    showTimeInput //just show time in input
     /> */
                <div className='col-md-4 col-12 m-auto'>
                     <h3>Book your date and Time</h3>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />

                            <TimePicker
                                label="Time"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </Stack>
                    </LocalizationProvider>
                    <Button variant='contained' onClick={submitBooking}>Submit</Button>
                </div>

            }
            
        </div>}
        <Dialog open={showResponse}>
            <DialogTitle>
                Success!
            </DialogTitle>
            <DialogContentText className='p-4'>
                <div>
                    <Typography>
                        You have successfully booked an appointment!
                    </Typography>
                    <Button onClick={navigateToDashboard}>Close</Button>
                </div>
            </DialogContentText>
        </Dialog></>;











}

export default Consultation;

// //<Datepicker
// //    controls={['calendar', 'timegrid']}
// //    touchUi={true}
// ///>


// const DatePicker = () => {
//     const [date, setDate] = useState(null)
//     const disabledDates = [
//       {
//         year: 2015,
//         month: 6,
//         day: 23
//       },
//       {
//         year: 2015,
//         month: 6,
//         day: 12
//       },
//       {
//         year: 2015,
//         month: 6,
//         day: 10
//       }
//     ]
//     return (
//       <DtPicker
//         onChange={setDate}
//         disabledDates={disabledDatesList}
//         minDate={minDate}
//         maxDate={maxDate}
//       />
//     )
//   }
//   export default DatePicker







