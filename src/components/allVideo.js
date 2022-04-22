import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoListItem from "./videoListItem";

function AllVideo() {
  const [show, setShow] = useState(false);
  const [dataVideo, setDataVideo] = useState();

  async function getVideo() {
    let cancel = false;
    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };

    try {
      if (cancel) return;
      const getVideo = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/Video`,
        config
      );
      setDataVideo(getVideo.data.data);
      console.log(getVideo.data.data);
    } catch (error) {
      console.error(error);
    }

    return () => {
      cancel = true;
    };
  }

  const buttonShow =
    "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center";
  const buttonHide =
    "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center";

  return (
    <div className="mb-6">
      <button
        className={show ? buttonShow : buttonHide}
        onClick={() => {
          setShow(!show);
          if (!dataVideo) {
            getVideo();
          }
        }}
      >
        <img
          className="h-16 w-16 ml-6 object-contain"
          src={
            show
              ? require("../icons/all_video_white.png")
              : require("../icons/all_video_blue.png")
          }
        />
        <span className="text-2xl ml-4"> Lihat semua video </span>
      </button>
      <div
        className={
          show
            ? "w-full bg-buletinLightGray mt-2 py-4 rounded-3xl flex flex-col justify-center items-center"
            : "hidden"
        }
      >
        <span className="w-full px-8 flex justify-start text-xl text-black">
          Menampilkan hasil semua video
        </span>
        {dataVideo && (
          <div className="w-full px-8 flex justify-between text-xl font-bold">
            <span className="w-2/5"> ID Video Youtube</span>
            <span className="w-1/4"> Judul </span>
            <span className="w-1/4"> Channel </span>
          </div>
        )}
        {/* {dataVideo && (
          <ul>
            {dataVideo.map((el) => (
							<li className="w-full px-8 flex justify-between text-xl">
							<span className="w-2/5"> ID Video Youtube</span>
            <span className="w-1/4"> Judul </span>
            <span className="w-1/4"> Channel </span>
							</li>
					))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

export default AllVideo;
