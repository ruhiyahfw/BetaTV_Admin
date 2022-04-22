import React from "react";

export default function VideoListItem({IdVideo, judul, channel}) {
  return (
    <li className="w-full px-8 flex justify-between text-xl">
      <span className="w-2/5"> {IdVideo} </span>
      <span className="w-1/4"> {judul} </span>
      <span className="w-1/4"> {channel} </span>
    </li>
  );
}
