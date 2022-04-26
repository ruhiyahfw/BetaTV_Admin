import Navbar from "../components/navbar";
import { Route, Routes, Navigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import UserPanel from "../components/userPanel";
import VideoPanel from "../components/videoPanel";
import { useState } from "react";

const AdminPage = () => {
  const [me, setMe] = useState(null);

  const setCurrentMe = (val) => {
    setMe(val);
  }

  return (
    <>
      <Navbar setCurrentMe={setCurrentMe} />
      <section>
        <Routes>
          <Route path="/user" element={<UserPanel me={me} />} />
          <Route path="/video" element={<VideoPanel />} />
          <Route path="/kategori" element={<VideoPanel />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </section>
      <ToastContainer />
    </>
  )
}

export default AdminPage;