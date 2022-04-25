import React from 'react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './screens/login';
import ConfirmPage from './screens/ConfirmPage';
import HomePage from './screens/HomePage';
import AdminPage from './screens/AdminPage';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/confirm/:token" element={<ConfirmPage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;