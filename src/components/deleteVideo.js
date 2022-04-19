import axios from "axios";
import React, { useState } from "react";

function DeleteVideo() {
  const [show, setShow] = useState(false);
  const [idvideo, setidvideo] = useState(0);

  const buttonShow =
    "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center";
  const buttonHide =
    "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center";

  async function clickDeleteVideo(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
        id: idvideo,
      },
    };
    
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/Video/${idvideo}`,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setidvideo("");
  }

  return (
    <div className="mb-6">
      <button
        className={show ? buttonShow : buttonHide}
        onClick={() => setShow(!show)}
      >
        <img
          className="h-16 w-16 ml-6 object-contain"
          src={
            show
              ? require("../icons/delete_video_white.png")
              : require("../icons/delete_video_blue.png")
          }
        />
        <span className="text-2xl ml-4"> Hapus video </span>
      </button>
      <form
        className={
          show
            ? "w-full bg-buletinLightGray mt-2 py-4 rounded-3xl flex flex-col justify-center"
            : "hidden"
        }
      >
        <span className="w-full px-8 mb-3 flex justify-start text-xl text-black">
          Masukkan id video yang ingin dihapus
        </span>
        <input
          type="number"
          className="w-80 h-10 mx-7 mb-3 px-4 border border-black rounded-xl text-xl outline-none"
          placeholder="id video"
          value={idvideo}
          onChange={e => setidvideo(e.target.value)}
        />
        <button 
          className="w-36 h-10 mx-7 bg-buletinBlue text-xl text-white rounded-3xl"
          onClick={e => clickDeleteVideo(e)}
        >
          Hapus
        </button>
      </form>
    </div>
  );
}

export default DeleteVideo;
