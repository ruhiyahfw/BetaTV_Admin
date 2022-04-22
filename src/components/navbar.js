import React, { useState } from "react";
import Logout from "./logout";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="h-32 w-full px-12 bg-buletinBlue flex justify-between items-center">
      <h1 className="text-white font-semibold text-4xl">
        Beta.TV - Admin Page
      </h1>
      <div className="w-[360px] flex justify-between">
        <a href="/user">
          <span className="text-white font-medium text-2xl"> 
            User 
          </span>
        </a>
        <a href="/video">
          <span className="text-white font-medium text-2xl">
            Video 
          </span>
        </a>
        <button
          onClick={() => {
            setShowLogout(true);
          }}
        > 
         <span className="text-white font-medium text-2xl">
            Logout
          </span> 
        </button>
      </div>
      <Logout isShow={showLogout} onClick={() => setShowLogout(false)}/>
    </div>
  );
}
export default Navbar;
