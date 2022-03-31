import axios from "axios";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ConfirmPage from "./pages/ConfirmPage";
import HomePage from "./pages/HomePage";

const ShowVideo = () => {
  const [allVideo, changeAllVid] = useState(false);
  const [content, setContent] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/Video");
      setContent(response.data.data.videos);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => {
          fetchData();
          changeAllVid(!allVideo);
        }}
      >
        <span className="font-medium text-white"> lihat semua video </span>
      </button>
      <div className={allVideo ? "w-full flex justify-center" : "hidden"}>
        <ul className="w-[70%]">
          <li className="w-full flex justify-between font-semibold">
            <span> ID </span>
            <span> URL </span>
            <span> Deskripsi </span>
          </li>
          {content ? (
            content.map((el) => (
              <li key={el.id} className="w-full flex justify-between">
                <span> {el.id} </span>
                <a href={el.url}> {el.title} </a>
                <span> {el.category} </span>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

const ShowVideoCategory = () => {
  const [categoryVideo, changeCV] = useState(false);
  const [search, updateSearch] = useState("");
  const [failedSearch, updateFailed] = useState("");
  const [result, updateResult] = useState();

  async function fetchData(category) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Video/category/" + category
      );
      updateResult(response.data.data.videos);
    } catch (err) {
      console.error(err);
      updateResult([]);
      updateFailed(category);
    }
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeCV(!categoryVideo)}
      >
        <span className="font-medium text-white">lihat video by kategori</span>
      </button>
      <div
        className={
          categoryVideo ? "w-full flex flex-col items-center" : "hidden"
        }
      >
        <form className="flex flex-col items-start justify-start">
          <input
            className="border-2 px-2 mb-2 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Cari kategori"
            onChange={(e) => updateSearch(e.target.value)}
          />
          <button
            className="px-2 py-1 mx-2 bg-gray-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              fetchData(search);
            }}
          >
            Cari
          </button>
        </form>
        <ul className="w-[70%] flex flex-col items-center">
          {result &&
            (result.length ? (
              result.map((el) => (
                <li key={el.id} className="w-full flex justify-between">
                  <span> {el.id} </span>
                  <a href={el.url}> {el.title} </a>
                  <span> {el.category} </span>
                </li>
              ))
            ) : (
              <span> tidak ada video dalam kategori "{failedSearch}"</span>
            ))}
        </ul>
      </div>
    </>
  );
};

const AddVideo = () => {
  const [showAddVideo, changeAddVid] = useState(false);
  const [judul, updateJudul] = useState("");
  const [channel, updateChannel] = useState("");
  const [url, updateURL] = useState("");
  const [views, updateViews] = useState("");
  const [rating, updateRating] = useState("");
  const [kategori, updateKategori] = useState("");
  const [deskripsi, updateDeskripsi] = useState("");

  async function addNewvideo(videoData) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Video",
        videoData
      );
      if (response.status < 300) {
        alert("video berhasil ditambahkan");
      }
    } catch (error) {
      console.error(error);
      alert("terjadi kesalahan penambahan video");
    }
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeAddVid(!showAddVideo)}
      >
        <span className="font-medium text-white"> tambah video baru </span>
      </button>
      <div className={showAddVideo ? "flex" : "hidden"}>
        <form className="flex flex-col items-start">
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Judul Video"
            value={judul}
            onChange={(e) => updateJudul(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="ID Channel"
            value={channel}
            onChange={(e) => updateChannel(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="url Video"
            value={url}
            onChange={(e) => updateURL(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Jumlah Views"
            value={views}
            onChange={(e) => updateViews(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96" 
            type="text"
            placeholder="Rating"
            value={rating}
            onChange={(e) => updateRating(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Kategori Video"
            value={kategori}
            onChange={(e) => updateKategori(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Deskripsi Video"
            value={deskripsi}
            onChange={(e) => updateDeskripsi(e.target.value)}
          />
          <button
            className="px-2 py-1 my-1 bg-gray-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              const videoData = {
                title: judul,
                channelId: channel,
                url: url,
                views: views,
                rating: rating,
                category: kategori,
                description: deskripsi,
              };

              addNewvideo(videoData);

              updateJudul("");
              updateChannel("");
              updateURL("");
              updateViews("");
              updateRating("");
              updateKategori("");
              updateDeskripsi("");
            }}
          >
            Tambahkan Video Baru
          </button>
        </form>
      </div>
    </>
  );
};

const EditVideo = () => {
  const [showUpdateVideo, changeUV] = useState(false);
  const [idVideo, updateIDVideo] = useState("");
  const [judul, updateJudul] = useState("");
  const [url, updateURL] = useState("");
  const [kategori, updateKategori] = useState("");
  const [deskripsi, updateDeskripsi] = useState("");

  async function editDataVideo(idVideo, editedData) {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/Video/" + idVideo,
        editedData
      );
      if (response.status < 300) {
        alert(`video berhasil dengan id: ${idVideo} berhasil diubah`);
      }
    } catch (error) {
      console.err(error);
      alert("terjadi kesalahan pengubahan video");
    }
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeUV(!showUpdateVideo)}
      >
        <span className="font-medium text-white"> update data video </span>
      </button>
      <div className={showUpdateVideo ? "flex" : "hidden"}>
        <form className="flex flex-col items-start">
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="ID Video"
            value={idVideo}
            onChange={(e) => updateIDVideo(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Judul Video"
            value={judul}
            onChange={(e) => updateJudul(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="url Video"
            value={url}
            onChange={(e) => updateURL(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Kategori Video"
            value={kategori}
            onChange={(e) => updateKategori(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="Deskripsi Video"
            value={deskripsi}
            onChange={(e) => updateDeskripsi(e.target.value)}
          />
          <button
            className="px-2 py-1 my-1 bg-gray-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              const videoData = {
                title: judul,
                url: url,
                category: kategori,
                description: deskripsi,
              };

              editDataVideo(idVideo, videoData);

              updateIDVideo("");
              updateJudul("");
              updateURL("");
              updateKategori("");
              updateDeskripsi("");
            }}
          >
            Edit Data Video
          </button>
        </form>
      </div>
    </>
  );
};

const DeleteVideo = () => {
  const [showDeleteVideo, changeDV] = useState(false);
  const [idVideo, updateIDVideo] = useState("");
  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeDV(!showDeleteVideo)}
      >
        <span className="font-medium text-white"> hapus video </span>
      </button>
      <div className={showDeleteVideo ? "flex" : "hidden"}>
        <form className="flex flex-col items-start">
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="ID Video"
            value={idVideo}
            onChange={(e) => updateIDVideo(e.target.value)}
          />
          <button
            className="px-2 py-1 my-1 bg-gray-300 rounded-md"
            onClick={async (e) => {
              e.preventDefault();

              try {
                const response = await axios.delete(
                  "http://localhost:5000/api/Video/" + idVideo
                );
                if (response.status < 300) {
                  alert(`video dengan di ${idVideo} berhasil dihapus`);
                }
              } catch (error) {
                console.error(error);
              }

              updateIDVideo("");
            }}
          >
            Hapus Video
          </button>
        </form>
      </div>
    </>
  );
};

const ShowAllUser = () => {
  const [showUser, changeSU] = useState(false);
  const [content, setContent] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/User");
      setContent(response.data.data.users);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-green-400 rounded-md flex items-center"
        onClick={() => {
          fetchData();
          changeSU(!showUser);
        }}
      >
        <span className="font-medium text-white"> lihat semua user </span>
      </button>
      <div className={showUser ? "w-full flex justify-center" : "hidden"}>
        <ul className="w-[70%]">
          <li className="w-full flex justify-between font-semibold">
            <span> ID </span>
            <span> Name </span>
            <span> Username </span>
          </li>
          {content ? (
            content.map((el) => (
              <li key={el.id} className="w-full flex justify-between">
                <span> {el.id} </span>
                <span> {el.name} </span>
                <span> {el.username} </span>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

const DeleteUser = () => {
  const [showDeleteUser, changeDU] = useState(false);
  const [idUser, updateIDUser] = useState("");
  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-green-400 rounded-md flex items-center"
        onClick={() => changeDU(!showDeleteUser)}
      >
        <span className="font-medium text-white"> hapus user </span>
      </button>
      <div className={showDeleteUser ? "flex" : "hidden"}>
        <form className="flex flex-col items-start">
          <input
            className="border-2 px-2 my-1 border-black rounded-md lg:w-96"
            type="text"
            placeholder="ID User"
            value={idUser}
            onChange={(e) => updateIDUser(e.target.value)}
          />
          <button
            className="px-2 py-1 my-1 bg-gray-300 rounded-md"
            onClick={async (e) => {
              e.preventDefault();

              try {
                const response = await axios.delete(
                  "http://localhost:5000/api/User/" + idUser
                );
                if (response.status < 300) {
                  alert(`user dengan di ${idUser} berhasil dihapus`);
                }
              } catch (error) {
                console.error(error);
                alert("terjadi kesalahan penghapusan user")
              }

              updateIDUser("");
            }}
          >
            Hapus User
          </button>
        </form>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Confirm/:userId" element={<ConfirmPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
