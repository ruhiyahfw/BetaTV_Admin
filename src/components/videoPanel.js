import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AddVideoPopUp from "./AddVideoPopup";
import EditVideoPopup from "./EditVideoPopup";
import VideoList from "./VideoList";

function VideoPanel() {
  const [idEditVideo, setIdEditVideo] = useState(2);
  const [showEditvideo, setShowEditVideo] = useState(false);
  const [showAddvideo, setShowAddVideo] = useState(false);
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
          Videos
        </h1>
        <VideoList/>
      </div>
    </div>
  );
}

export default VideoPanel;
