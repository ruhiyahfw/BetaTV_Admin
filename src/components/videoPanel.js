import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AddVideo from "./addVideo";
import AllVideo from "./allVideo";
import CategoryVideo from "./categoryVideo";
import DeleteVideo from "./deleteVideo";
import EditVideo from "./editVideo";
import Navbar from "./navbar";

function VideoPanel() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!window.sessionStorage.getItem('token')) {
      navigate('/admin');
    }
  }, [])

  return (
    <div>
      <div className="w-full px-12 mt-8 mb-6 flex flex-col">
        <h1 className="mb-6 text-4xl text-buletinDarkBlue font-medium">
          Menu User
        </h1>
        <AddVideo/>
        <EditVideo/>
        <DeleteVideo/>
        <AllVideo/>
        <CategoryVideo/>
      </div>
    </div>
  );
}

export default VideoPanel;
