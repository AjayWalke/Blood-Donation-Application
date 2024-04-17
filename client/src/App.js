import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/auth/login';
import Register from './pages/auth/Register';
import ProtectedRoutes from './components/shared/Routes/ProtectedRoutes';
import PublicRoutes from './components/shared/Routes/PublicRoutes';
import Donar from './components/Layout/Donar';
import Hospital from './components/Layout/Hospital';
import Organization from './components/Layout/Organization';
import BloodData from './components/Layout/BloodData';
// import { ToastContainer, toast } from 'react-toastify'

function App() {
  return (
    <>
      {/* <ToastContainer/> */}
      <Routes>
        {/* element={} means that this element should be rendered when the path finds */}
        <Route path='/' element={<ProtectedRoutes><HomePage/> </ProtectedRoutes>}/> 
        <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register/></PublicRoutes>} /> 
        <Route path='/donar' element={<ProtectedRoutes><Donar/> </ProtectedRoutes>}/>
        <Route path='/hospital' element={<ProtectedRoutes><Hospital/></ProtectedRoutes>}/>
        <Route path='/blood-data' element={<ProtectedRoutes><BloodData/></ProtectedRoutes>}/>
        <Route path='/organization' element={<ProtectedRoutes><Organization/></ProtectedRoutes>}/>
      </Routes>
    </>
  );
}

export default App;
