import axios from "axios";
import { useState } from "react";

const ShowVideo = () => {
  const [allVideo, changeAllVid] = useState(false);
  const [content, setContent] = useState(null);

  function fetchData() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(JSON.parse(this.responseText));
      };

      xhr.onerror = function (err) {
        console.log("error di fetching, message: " + err);
        reject(err);
      };

      xhr.open("GET", "http://localhost:5000/api/Video", true);
      xhr.send();
    });
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => {
          if (!content) {
            fetchData()
              .then((res) => setContent(res))
              .catch((err) => console.error(err));
          }

          //console.log(content)
          changeAllVid(!allVideo);
        }}
      >
        <span className="font-medium text-white"> lihat semua video </span>
      </button>
      <div className={allVideo ? "flex" : "hidden"}>
        <ul className="">
          {content ? (
            content.map((el) => (
              <li key={el.id}>
                <a href={el.url}> {el.title} </a>
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

  function fetchData(category) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(this.responseText);
      };

      xhr.onerror = function (err) {
        console.log("error di fetching, message: " + err);
        reject(err);
      };

      xhr.open(
        "GET",
        "http://localhost:5000/api/Video/category/" + category,
        true
      );

      xhr.send();
    });
  }

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeCV(!categoryVideo)}
      >
        <span className="font-medium text-white">lihat video by kategori</span>
      </button>
      <div className={categoryVideo ? "flex flex-col items-center" : "hidden"}>
        <form className="w-24 h-auto mb-3 flex justify-around">
          <input
            className="border-2 px-2 border-black rounded-md"
            type="text"
            placeholder="Cari kategori"
            onChange={(e) => updateSearch(e.target.value)}
          />
          <button
            className="px-2 py-1 mx-2 bg-gray-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();

              fetchData(search)
                .then((res) => {
                  res === "There is no such category"
                    ? updateResult([])
                    : updateResult(JSON.parse(res));
                  updateFailed(search);
                })
                .catch((err) => console.log(err));
            }}
          >
            Cari
          </button>
        </form>
        <ul className="">
          {result &&
            (result.length ? (
              result.map((el) => (
                <li key={el.id}>
                  <a href={el.url}> {el.title} </a>
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
      const response = await axios.post("http://localhost:5000/api/Video", videoData);
      console.log(response);
    } catch (error) {
      console.err(error);
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
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Judul Video"
            value={judul}
            onChange={(e) => updateJudul(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="ID Channel"
            value={channel}
            onChange={(e) => updateChannel(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="url Video"
            value={url}
            onChange={(e) => updateURL(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Jumlah Views"
            value={views}
            onChange={(e) => updateViews(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Rating"
            value={rating}
            onChange={(e) => updateRating(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Kategori Video"
            value={kategori}
            onChange={(e) => updateKategori(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
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
      const response = await axios.put("http://localhost:5000/api/Video/" +  idVideo, editedData);
      console.log(response);
    } catch (error) {
      console.err(error);
    }
  }

  return(
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
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="ID Video"
            value={idVideo}
            onChange={(e) => updateIDVideo(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Judul Video"
            value={judul}
            onChange={(e) => updateJudul(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="url Video"
            value={url}
            onChange={(e) => updateURL(e.target.value)}
          />   
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
            type="text"
            placeholder="Kategori Video"
            value={kategori}
            onChange={(e) => updateKategori(e.target.value)}
          />
          <input
            className="border-2 px-2 my-1 border-black rounded-md"
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
}

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
            className="border-2 px-2 my-1 border-black rounded-md"
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
                const response = await axios.delete("http://localhost:5000/api/Video/" +  idVideo);
                console.log(response);
              } catch(error) {
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
}

function App() {
  const [showUser, changeSU] = useState(false);
  const [deleteUser, changeDU] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="h-16 w-screen px-8 mb-10 bg-blue-400 flex items-center rounded-b-lg">
        <h1 className="font-bold text-2xl"> Admin Page Beta.tv</h1>
      </div>
      <div className="w-screen flex justify-center items-center">
        {/* section user */}
        <div className="w-1/2 h-full flex flex-col items-center justify-start">
          <h1 className="font-semibold text-gray-600 text-xl"> User </h1>

          {/*  fetch semua user dari back end */}
          <button
            className="w-[90%] h-12 my-4 px-4 bg-green-400 rounded-md flex items-center"
            onClick={() => changeSU(!showUser)}
          >
            <span className="font-medium text-white"> lihat semua user </span>
          </button>
          <div className={showUser ? "flex" : "hidden"}>list user</div>

          {/* buat form lalu delete user by id */}
          <button
            className="w-[90%] h-12 my-4 px-4 bg-green-400 rounded-md flex items-center"
            onClick={() => changeDU(!deleteUser)}
          >
            <span className="font-medium text-white"> hapus user </span>
          </button>
          <div className={deleteUser ? "flex" : "hidden"}>
            form delete user by id
          </div>
        </div>

        {/* section video */}
        <div className="w-1/2 h-full flex flex-col items-center justify-start">
          <h1 className="font-semibold text-gray-600 text-xl"> Video </h1>

          {/* liat semua video */}
          <ShowVideo />

          {/* liat video kategori tertentu */}
          <ShowVideoCategory />

          {/* add video baru ke sistem */}
          <AddVideo />

          {/* update data video by id */}
          <EditVideo/>

          {/* delete video by id */}
          <DeleteVideo/>
        </div>
      </div>
    </div>
  );
}

export default App;
