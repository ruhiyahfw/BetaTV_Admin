import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar from './components/navbar';
import Login from './screens/login';
import UserPanel from './screens/userPanel';
import VideoPanel from './screens/videoPanel';
import ConfirmPage from './screens/ConfirmPage';
import HomePage from './screens/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/confirm/:token" element={<ConfirmPage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/user" element={<UserPanel />} />
        <Route path="/admin/video" element={<VideoPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;