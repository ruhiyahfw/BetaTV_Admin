import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "./getCategory";

export default function CategoryList() {
  const [daftarkategori, setdaftarkategori] = useState();
  const [kategoriBaru, setKategoriBaru] = useState();
  const [update, setUpdate] = useState(0);

  async function clickAddCategory(e) {
    e.preventDefault();

    const addVideoData = {
      label: kategoriBaru,
    };

    const config = {
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
/* 
    try {
      const add = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/Category`,
        addVideoData,
        config
      );
      window.alert("berhasil menambahkan kategori");
      window.location.reload();
    } catch (error) {
      console.error(error);
    } */
    try {
      const add = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/Category`,
          addVideoData,
          config
        ), 
        {
          pending: 'mencoba menambah kategori..',
          success: 'kategori berhasil ditambah',
          error: 'gagal menambah kategori'
        }
      ); 
    } catch (error) {
      console.error(error);
    } finally {
      setKategoriBaru("");
      setUpdate(update + 1);
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
  }, [update]);

  if (daftarkategori == null) {
		return <h1>Loading...</h1>;
	}

  return (
    <div className="h-auto w-auto flex">
      <div className="w-auto flex flex-col text-base mr-4">
        <span className="font-bold mb-2"> Tambah kategori baru </span>
        <input
          type="text"
          className="w-80 h-8 mb-3 px-3 border border-black rounded-xl text-base"
          placeholder="Nama kategori"
          value={kategoriBaru}
          onChange={(e) => setKategoriBaru(e.target.value)}
        />
        <button 
				  className='h-8 w-48 rounded-xl shadow-md bg-buletinBlue text-white font-medium'
          onClick={e => clickAddCategory(e)}
			  >
				  + Tambahkan
			  </button>
      </div>
      <div className="w-64 p-3 rounded-md bg-buletinLightGray">
        <div className="text-base flex justify-between font-bold ">
          <span className="w-12"> No </span>
          <span className="w-44"> Nama </span>
        </div>
        {daftarkategori.map((kategori, idx) => 
          <div className="text-base flex justify-between">
            <span className="w-12"> {idx+1} </span>
            <span className="w-44"> {kategori.label} </span>
          </div>
        )}
      </div>
    </div>
  );
}
