import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Common/Header';
import Login from './Components/Login';
import InvalidPage from './Components/Common/InvalidPage';
import Dashboard from './Components/Dashboard';
import PatientProfile from './Components/PatientProfile';
import PatientRegistration from './Components/PatientRegistration';
import TakeTest from './Components/TakeTest';
import Home from './Components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <BrowserRouter>
        <Header authenticate={() => setIsLoggedIn(false)} isLoggedIn={isLoggedIn} />
        <Routes>
          {isLoggedIn ? <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/patientProfile/:healthId' element={<PatientProfile />} />
            <Route path='/registerPatient' element={<PatientRegistration />} />
            <Route path='/takeTest/:healthId' element={<TakeTest />} />
          </> :
            <>
              <Route path='/login' element={<Login authenticate={() => setIsLoggedIn(true)} />} />
            </>
          }
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path='*' element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
