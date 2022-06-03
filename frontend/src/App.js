import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Common/Header';
import Login from './Components/Login';
import InvalidPage from './Components/Common/InvalidPage';
import Dashboard from './Components/Dashboard';
import PatientProfile from './Components/PatientProfile';
import PatientRegistration from './Components/PatientRegistration';
import TakeTest from './Components/TakeTest';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/patientProfile/:healthId' element={<PatientProfile />} />
          <Route path='/registerPatient' element={<PatientRegistration />} />
          <Route path='/takeTest/:healthId' element={<TakeTest />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<InvalidPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
