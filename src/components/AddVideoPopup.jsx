import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "./getCategory";

export default function AddVideoPopUp({ isShow, close }) {
  const [judul, setjudul] = useState("");
  const [youtubeId, setyoutubeid] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [daftarkategori, setdaftarkategori] = useState();

  const styleShow =
    "w-[740px] h-[620px] pt-10 pb-6 px-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-buletinDarkerBlue rounded-3xl flex flex-col items-center justify-around z-10";

  function handleCheckBox() {
    let arr = [];
    daftarkategori.map((el) => {
      if (document.getElementById("add?" + el.label).checked) {
        arr.push(el.label);
      }
    });
    return arr;
  }

  function emptyCheckBox() {
    daftarkategori.map((el) => {
      if (document.getElementById("add?" + el.label).checked) {
        document.getElementById("add?" + el.label).checked = false;
      }
    });
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

/*     try {
      const add = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/Video`,
        addVideoData,
        config
      );
      toast.success("berhasil menambahkan video");    
    } catch (error) {
      toast.error("gagal menambahkan video");
      console.error(error);
    } finally {
      close();
    } */
    try {
      const add = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/Video`,
          addVideoData,
          config
        ), 
        {
          pending: 'mencoba menambah video..',
          success: 'video berhasil ditambah',
          error: 'gagal menambah video'
        }
      ); 
    } catch (error) {
      console.error(error);
    } finally {
      setjudul("");
      setyoutubeid("");
      setdeskripsi("");
      emptyCheckBox();
      close();
    }
  }

  useEffect(async () => {
    try {
      const response = await getCategory(
        window.sessionStorage.getItem("token")
      );
      setdaftarkategori(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div id="container-edit-video" className={isShow ? styleShow : "hidden"}>
      <form>
        <span className="w-full mb-3 flex justify-start text-base text-white font-medium">
          Masukkan judul video
        </span>
        <input
          type="text"
          className="w-80 h-10 mb-5 px-3 border border-black rounded-xl text-base"
          placeholder="Judul video"
          value={judul}
          onChange={(e) => setjudul(e.target.value)}
        />
        <span className="w-full mb-3 flex justify-start text-base text-white font-medium">
          Masukkan id video di youtube
        </span>
        <input
          type="text"
          className="w-80 h-10 mb-5 px-3 border border-black rounded-xl text-base"
          placeholder="Youtube video id"
          value={youtubeId}
          onChange={(e) => setyoutubeid(e.target.value)}
        />
        <span className="w-full flex justify-start text-base text-white font-medium">
          Masukkan kategori video (bisa lebih dari 1)
        </span>
        <div
          id="kategori-box"
          className="w-full h-auto mb-5 flex flex-wrap space-x-4"
        >
          {daftarkategori &&
            daftarkategori.map((el, index) => (
              <div
                className="w-auto h-8 flex justify-start items-center"
                key={"category" + index}
              >
                <input
                  id={"add?" + el.label}
                  type="checkbox"
                  className="w-5 h-5 mr-3 text-base text-white"
                />
                <span className="text-base text-white"> {el.label} </span>
              </div>
            ))}
        </div>
        <div className="w-[600px]">
          <span className="w-full mb-3 flex justify-start text-base text-white font-medium">
            Masukkan deskrispsi video
          </span>
          <textarea
            className="w-full h-40 px-3 py-2 border border-black rounded-xl text-base"
            placeholder="Deskripsi video"
            value={deskripsi}
            onChange={(e) => {
              setdeskripsi(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="w-full h-full flex relative">
        <button
          className="w-48 h-10 bg-buletinLightGray text-base text-black rounded-3xl absolute bottom-0 right-0"
          onClick={(e) => clickAddVideo(e)}
        >
          Tambah Video
        </button>
        <button
          className="w-48 h-10 bg-buletinLightGray text-base text-black rounded-3xl absolute bottom-0 right-52"
          onClick={close}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
