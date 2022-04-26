import React from "react";

export default function CategoryList() {
  return (
    <div className="pb-10">
      <div className="relative mb-4 px-8 pt-4 pb-8 overflow-x-auto shadow-md sm:rounded-lg bg-buletinLightGray">
        <table className="w-full relative text-sm text-left text-black table-fixed">
          <thead className="text-xs border-b-2 border-black uppercase text-center">
            <tr>
              <th scope="col" className="w-10 absolute left-0">
                No
              </th>
              <th scope="col" className="w-1/5 absolute left-14 bottom-2">
                Nama
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <button className="h-8 w-48 rounded-xl shadow-md bg-buletinBlue text-white font-medium">
        + Tambah kategori
      </button>
    </div>
  );
}
