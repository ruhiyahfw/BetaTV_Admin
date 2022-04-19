import React, { useState } from "react"; 

function AllVideo() {
  const [show, setShow] = useState(false);
  const [data, updateData] = useState([]);
  
  const buttonShow = "w-[50rem] h-20 border-buletinBlue text-white bg-buletinDarkerBlue border-2 rounded-3xl flex justify-start items-center"
  const buttonHide = "w-[50rem] h-20 border-buletinBlue text-black border-2 rounded-3xl flex justify-start items-center"

  return (
		<div className="mb-6">
			<button 
				className={show ? buttonShow : buttonHide}
				onClick={() => setShow(!show)}
			>
				<img className="h-16 w-16 ml-6 object-contain" src={show ? require("../icons/all_video_white.png") : require("../icons/all_video_blue.png")}/>
				<span className="text-2xl ml-4"> Lihat semua video </span>
			</button>	
			<div className={show ? "w-full bg-buletinLightGray mt-2 py-4 rounded-3xl flex justify-center" : "hidden"}>
				<span className="w-full px-8 flex justify-start text-xl text-black"> Menampilkan hasil semua video </span>
			</div>
		</div>
  );
}

export default AllVideo;
