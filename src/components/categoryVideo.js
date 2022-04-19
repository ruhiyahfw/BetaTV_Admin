import React, { useState } from "react";

function CategoryVideo() {
  const [show, setShow] = useState(false);
  const [data, updateData] = useState([]);

  const buttonShow =
    "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center";
  const buttonHide =
    "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center";

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
              ? require("../icons/category_video_white.png")
              : require("../icons/category_video_blue.png")
          }
        />
        <span className="text-2xl ml-4"> Lihat video berdasarkan kategori </span>
      </button>
      <div
        className={
          show
            ? "w-full bg-buletinLightGray mt-2 py-4 rounded-3xl flex flex-col justify-center"
            : "hidden"
        }
      >
        <span className="w-full px-8 mb-3 flex justify-start text-xl text-black">
          Pilih kategori video
        </span>
        <div className="flex px-8">
          <div className="w-28 h-14 mb-3 flex justify-start items-center">
            <input
              type="radio"
              className="w-5 h-5 mr-3 text-xl text-black"
              value="Tech"
              name="category"
            />
            <span className="text-xl text-black"> Tech </span>
          </div>
          <div className="w-28 h-14 mb-3 flex justify-start items-center">
            <input
              type="radio"
              className="w-5 h-5 mr-3 text-xl text-black"
              value="Bisnis"
              name="category"
            />
            <span className="text-xl text-black"> Bisnis </span>
          </div>
          <div className="w-28 h-14 mb-3 flex justify-start items-center">
            <input
              type="radio"
              className="w-5 h-5 mr-3 text-xl text-black"
              value="Desain"
              name="category"
            />
            <span className="text-xl text-black"> Desain </span>
          </div>
        </div>
        <button className="w-36 h-10 mx-7 bg-buletinBlue text-xl text-white rounded-3xl">
          Cari
        </button>
      </div>
    </div>
  );
}

export default CategoryVideo;
