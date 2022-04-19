import React, { useState } from "react";
import axios from "axios";

function AddVideo() {
  const [show, setShow] = useState(false);
  const [judul, setjudul] = useState("");
  const [youtubeId, setyoutubeid] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [kategori, updatekategori] = useState([]);

  const buttonShow =
    "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center";
  const buttonHide =
    "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center";

  function handleCheckBox(e) {
    let arr = kategori;
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.filter((el) =>  el !== e.target.value 
      );
    }
    updatekategori(arr);
  }

  function checkedCheckbox(str) {
    return kategori.includes(str)
  }

  async function clickAddVideo(e) {
    e.preventDefault();

    const addVideoData = {
      authorTitle: judul,
      authorDescription: deskripsi,
      youtubeVideoId: youtubeId,
      categorySlugs: kategori,
    };

    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem('token'),
      },
    };

    try {
			const login = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/Video`, addVideoData, config);
			console.log(login.data);
		} catch (error) {
			console.error(error)
		} 
    
    setjudul('');
    setyoutubeid('');
    setdeskripsi('');
    updatekategori([]);
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
            <span className="w-full flex justify-start text-xl text-black">
              Masukkan kategori video (bisa lebih dari 1)
            </span>
            <div className="flex">
              <div className="w-28 h-14 mb-3 flex justify-start items-center">
                <input
                  id="category1"
                  name="category1"
                  value="Tech"
                  type="checkbox"
                  className="w-5 h-5 mr-3 text-xl text-black"
                  onChange={(e) => handleCheckBox(e)}
                />
                <span className="text-xl text-black"> Tech </span>
              </div>
              <div className="w-28 h-14 mb-3 flex justify-start items-center">
                <input
                  id="category2"
                  name="category2"
                  value="Bisnis"
                  type="checkbox"
                  className="w-5 h-5 mr-3 text-xl text-black"
                  onChange={(e) => handleCheckBox(e)}
                />
                <span className="text-xl text-black"> Bisnis </span>
              </div>
              <div className="w-28 h-14 mb-3 flex justify-start items-center">
                <input
                  id="category3"
                  name="category3"
                  value="Desain"
                  type="checkbox"
                  className="w-5 h-5 mr-3 text-xl text-black"
                  onChange={(e) => handleCheckBox(e)}
                />
                <span className="text-xl text-black"> Desain </span>
              </div>
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
              onClick={e => clickAddVideo(e)}
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
