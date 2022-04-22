import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCategory } from "./getCategory";

function AddVideo() {
  const [show, setShow] = useState(false);
  const [judul, setjudul] = useState("");
  const [youtubeId, setyoutubeid] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [daftarkategori, setdaftarkategori] = useState();

  const buttonShow =
    "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center";
  const buttonHide =
    "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center";

  function handleCheckBox() {
    let arr = []
    daftarkategori.map((el) => {
      if(document.getElementById("add?"+el.label).checked) {
        arr.push(el.label);
      }
    })
    return arr;
  }

  function emptyCheckBox() {
    daftarkategori.map((el) => {
      if(document.getElementById("add?"+el.label).checked) {
        document.getElementById("add?"+el.label).checked = false;
      }
    })
  }

  async function clickAddVideo(e) {
    e.preventDefault();

    const addVideoData = {
      authorTitle: judul,
      authorDescription: deskripsi,
      youtubeVideoId: youtubeId,
      categorySlugs: handleCheckBox(),
    };

    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };

    try {
      const add = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/Video`,
        addVideoData,
        config
      );
      window.alert("berhasil menambahkan video");
      setShow(false);
    } catch (error) {
      console.error(error);
    }

    setjudul("");
    setyoutubeid("");
    setdeskripsi("");
    emptyCheckBox();
  }

  useEffect(async () => {
    try {
      const response = await getCategory(window.sessionStorage.getItem("token"));
      setdaftarkategori(response);
    } catch (error) {
      console.error(error)    
    }
  }, []);

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
              ? require("../icons/add_video_white.png")
              : require("../icons/add_video_blue.png")
          }
        />
        <span className="text-2xl ml-4"> Tambah video </span>
      </button>
      <div
        className={
          show
            ? "w-full bg-buletinLightGray mt-2 py-4 rounded-3xl flex flex-col justify-center"
            : "hidden"
        }
      >
        <div className="w-full h-auto px-8 flex justify-between">
          <form>
            <span className="w-full mb-3 flex justify-start text-xl text-black">
              Masukkan judul video
            </span>
            <input
              type="text"
              className="w-80 h-10 mb-3 px-4 border border-black rounded-xl text-xl"
              placeholder="Judul video"
              value={judul}
              onChange={(e) => setjudul(e.target.value)}
            />
            <span className="w-full mb-3 flex justify-start text-xl text-black">
              Masukkan id video di youtube
            </span>
            <input
              type="text"
              className="w-80 h-10 mb-3 px-4 border border-black rounded-xl text-xl"
              placeholder="Youtube video id"
              value={youtubeId}
              onChange={(e) => setyoutubeid(e.target.value)}
            />
            <span className="w-full flex mb-2 justify-start text-xl text-black">
              Masukkan kategori video (bisa lebih dari 1)
            </span>
            <div id="kategori-box" className="flex flex-col">
              {daftarkategori && daftarkategori.map((el, index) => (
                <div className="w-full h-8 flex justify-start items-center" key={"category" + index}>
                  <input
                    id={"add?" + el.label}
                    type="checkbox"
                    className="w-5 h-5 mr-3 text-xl text-black"
                  />
                  <span className="text-xl text-black"> {el.label} </span>
                </div>
              ))} 
            </div>
          </form>
          <div className="relative">
            <div className="w-[800px]">
              <span className="w-full mb-3 flex justify-start text-xl text-black">
                Masukkan deskrispsi video
              </span>
              <textarea
                className="w-full h-40 mb-3 px-4 border border-black rounded-xl text-xl"
                placeholder="Deskripsi video"
                value={deskripsi}
                onChange={(e) => setdeskripsi(e.target.value)}
              />
            </div>
            <button
              className="w-48 h-10 bg-buletinBlue text-xl text-white rounded-3xl absolute bottom-4 right-0"
              onClick={(e) => clickAddVideo(e)}
            >
              Tambah video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;
