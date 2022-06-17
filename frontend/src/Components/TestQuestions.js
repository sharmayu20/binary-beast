import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Dialog, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TestQuestions = () => {
    let navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showResponse, setShowResponse] = useState(false);
    const [responseObj, setResponseObj] = useState({});

    useEffect(() => {
        //to be replaced by API calls
        axios.get('/sampleQuestionsList.json')
            .then(result => {
                setQuestionList(result.data);
            })
    });
    const navigateToSlotBookingPage = () => {
        
        navigate('/dashboard2');


    }
    const handleChange = (e, id) => {
        setAnswers({ ...answers, [id]: e.target.value });
    }
    const submitResponses = () => {
        //to be repaced by API calls
        let response = 'test';
        if (response === 'test') {
            setResponseObj({ needsConsultation: true, consultationType: 'Psychiatrist' });
        }
        else {
            setResponseObj({ needsConsultation: false });
        }
        setShowResponse(true);
    }
    return <>{questionList && questionList.length !== 0 &&
        <Card className='questions-card'>
            <CardContent>
                <Typography variant='h5'>Questions</Typography>
                {questionList.map(questionObj => {
                    return <div className='border px-4 py-2' key={`div_${questionObj.id}`}>
                        <FormControl key={questionObj.id}>
                            <FormLabel id={questionObj.id}>
                                {questionObj.question}
                            </FormLabel>
                            <RadioGroup value={answers[questionObj.id]} row
                                onChange={(e) => handleChange(e, questionObj.id)}
                            >
                                {questionObj.questionOptions.map((option, index) => {
                                    return <FormControlLabel value={option.value} key={`${questionObj.id}_${index}`} control={<Radio />} label={option.label} />
                                })}

                            </RadioGroup>
                        </FormControl>
                    </div>
                })}
            </CardContent>
            <CardActions className='float-end'>
                <Button variant='contained' onClick={submitResponses}>Submit responses</Button>
            </CardActions>
        </Card>}
        <Dialog open={showResponse}>
            <DialogTitle>
                Test result
            </DialogTitle>
            <DialogContentText className='p-4'>
                {responseObj.needsConsultation ?
                    <div>
                        <Typography>
                            You need to consult with a {responseObj.consultationType}
                        </Typography>
                        <Button onClick={navigateToSlotBookingPage}>Book a slot now!</Button>
                    </div> :
                    <>No consultation</>}
            </DialogContentText>
        </Dialog></>;
}

export default TestQuestions;