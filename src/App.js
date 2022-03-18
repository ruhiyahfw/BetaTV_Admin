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
            onClick={e => {
              e.preventDefault();

              fetchData(search)
                .then(res => {
                  res === "There is no such category" ? updateResult([]) : updateResult(JSON.parse(res));
                  updateFailed(search)
                })
                .catch((err) => console.log(err));
            }}
          > Cari </button>
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

  return (
    <>
      <button
        className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
        onClick={() => changeAddVid(!showAddVideo)}
      >
        <span className="font-medium text-white"> tambah video baru </span>
      </button>
      <div className={showAddVideo ? "flex" : "hidden"}>
        {/* 
        "title": "string",
        "channelId": 0,
        "url": "string",
        "views": 0,
        "rating": 0,
        "category": "string",
        "description": "string" 
        */}
        <form className="flex flex-col items-start">
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="Judul Video" onChange={(e) => updateJudul(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="ID Channel" onChange={(e) => updateChannel(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="url Video" onChange={(e) => updateURL(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="Jumlah Views" onChange={(e) => updateViews(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="Rating" onChange={(e) => updateRating(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="Kategori Video" onChange={(e) => updateKategori(e.target.value)}></input>
          <input className="border-2 px-2 my-1 border-black rounded-md" type="text" placeholder="Deskripsi Video" onChange={(e) => updateDeskripsi(e.target.value)}></input>
          <button className="px-2 py-1 my-1 bg-gray-300 rounded-md" onClick={e => {
            e.preventDefault();
          }}> Tambahkan Video Baru </button>
        </form>
      </div>
    </>
  );
}

function App() {
  const [showUser, changeSU] = useState(false);
  const [deleteUser, changeDU] = useState(false);
  //const [allVideo, changeAllVid] = useState(false);
  //const [categoryVideo, changeCV] = useState(false);
  //const [showAddVideo, changeAddVid] = useState(false);
  const [showUpdateVideo, changeUV] = useState(false);
  const [showDeleteVideo, changeDV] = useState(false);

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
          <AddVideo/>

          {/* update data video by id */}
          <button
            className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
            onClick={() => changeUV(!showUpdateVideo)}
          >
            <span className="font-medium text-white"> update data video </span>
          </button>
          <div className={showUpdateVideo ? "flex" : "hidden"}>
            form dengan input id video utk update data
          </div>

          {/* delete video by id */}
          <button
            className="w-[90%] h-12 my-4 px-4 bg-orange-400 rounded-md flex items-center"
            onClick={() => changeDV(!showDeleteVideo)}
          >
            <span className="font-medium text-white"> hapus video </span>
          </button>
          <div className={showDeleteVideo ? "flex" : "hidden"}>
            form dengan input id video utk menghapus
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
