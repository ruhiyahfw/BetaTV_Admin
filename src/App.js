import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/navbar';
import Login from './screens/login';
import UserPanel from './screens/userPanel';
import VideoPanel from './screens/videoPanel';

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/user" element={<UserPanel/>} />
        <Route path="/video" element={<VideoPanel/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;