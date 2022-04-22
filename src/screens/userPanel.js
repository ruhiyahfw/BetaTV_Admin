import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AllUser from "../components/allUser";
import DeleteUser from "../components/deleteUser";
import Navbar from "../components/navbar";

function UserPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    if(!window.sessionStorage.getItem('token')) {
      navigate('/admin');
    }
  }, [])
  useEffect(() => {
    if(!window.sessionStorage.getItem('token')) {
      navigate('/admin');
    }
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="w-full px-12 mt-8 mb-6 flex flex-col">
        <h1 className="mb-6 text-4xl text-buletinDarkBlue font-medium">
          {" "}
          Menu User{" "}
        </h1>
        <AllUser />
        <DeleteUser />
      </div>
    </div>
  );
}

export default UserPanel;
