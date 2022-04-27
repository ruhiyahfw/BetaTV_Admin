import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "./getCategory";

export default function EditVideoPopup({ idvideo, isShow, close }) {
  const [judul, setjudul] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [daftarkategori, setdaftarkategori] = useState();

  const styleShow =
    "w-[740px] h-[620px] pt-10 pb-6 px-16 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-buletinDarkerBlue rounded-3xl flex flex-col items-center justify-around z-10";

  function handleCheckBox() {
    let arr = [];
    daftarkategori.map((el) => {
      if (document.getElementById("edit?" + el.label).checked) {
        arr.push(el.label);
        console.log(el.label);
      }
    });
    return arr;
  }

  function emptyCheckBox() {
    daftarkategori.map((el) => {
      if (document.getElementById("edit?" + el.label).checked) {
        document.getElementById("edit?" + el.label).checked = false;
      }
    });
  }

  async function clickEditVideo(e) {
    e.preventDefault();
    console.log(handleCheckBox());
    const editVideoData = {
      authorTitle: judul,
      categorySlugs: handleCheckBox(),
      authorDescription: deskripsi,
    };

    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
        id: idvideo,
      },
    };

/*     try {
      const edit = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/Video/${idvideo}`,
        editVideoData,
        config
      );
      toast.success("berhasil mengubah video");
    } catch (error) {
      toast.error("gagal mengubah video");
      console.error(error);
    } finally {
      onClick();
    } */

    try {
      const edit = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/Video/${idvideo}`,
          editVideoData,
          config
        ), 
        {
          pending: 'mencoba mengubah video..',
          success: 'video berhasil diubah',
          error: 'video gagal diubah'
        }
      ); 
    } catch (error) {
      console.error(error);
    } finally {
      setjudul("");
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
    <div className={isShow ? styleShow : "hidden"}>
      <form>
        <span className="w-full mb-3 flex justify-start text-base text-white font-medium">
          Masukkan judul video yang baru
        </span>
        <input
          type="text"
          className="w-80 h-10 mb-5 px-4 border border-black rounded-xl text-base"
          placeholder="Judul video"
          value={judul}
          onChange={(e) => {
            setjudul(e.target.value);
          }}
        />
        <span className="w-full flex justify-start text-base text-white font-medium">
          Masukkan kategori video (bisa lebih dari 1)
        </span>
        <div id="kategori-box" className="w-full h-auto mb-5 flex flex-wrap space-x-4">
          {daftarkategori &&
            daftarkategori.map((el, index) => (
              <div
                className="w-auto h-8 flex justify-start items-center"
                key={"category" + index}
              >
                <input
                  id={"edit?" + el.label}
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
          onClick={(e) => clickEditVideo(e)}
        >
          Edit Video
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
