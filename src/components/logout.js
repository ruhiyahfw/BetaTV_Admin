import React, { useEffect, useState } from "react";

function Logout({isShow ,onClick}) {
	const styleShow = "w-[740px] h-[600px] py-20 px-28 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-buletinLightGray rounded-3xl flex flex-col items-center justify-around"

  function deleteToken(e) {
    e.preventDefault();

    if(window.sessionStorage.getItem('token')) {
      window.sessionStorage.removeItem('token');
      window.location.href = "/login";
    }
  }

  return (
    <div className={isShow ? styleShow : "hidden"}>
      <span className="w-[400px] text-buletinDarkBlue text-4xl text-center font-semibold">
        Apa Anda yakin ingin keluar?
      </span>
      <div className="w-full flex justify-between">
        <button 
					className="w-52 h-16 bg-buletinBlue text-white text-4xl font-semibold rounded-3xl"
					onClick={onClick}
				>
          Tidak
        </button>
        <button 
          className="w-52 h-16 bg-buletinBlue text-white text-4xl font-semibold rounded-3xl"
          onClick={e => deleteToken(e)}
        >
          Ya
        </button>
      </div>
    </div>
  );
}

export default Logout;
