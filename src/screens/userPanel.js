import React, { useEffect } from "react";
import AllUser from "../components/allUser";
import DeleteUser from "../components/deleteUser";
import Navbar from "../components/navbar";

function UserPanel() {
  useEffect(() => {
    if(!window.sessionStorage.getItem('token')) {
      window.location.href = "/login";
    }
  }, [])
  useEffect(() => {
    if(!window.sessionStorage.getItem('token')) {
      window.location.href = "/login";
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
