import React from 'react'
// import TeamData from "../../../../backend/database/teams.json"
import "./style.css"

const Teams = () => {
  // const Data = TeamData;
  const string = "(2024 - 2025)"

  return (
    <>
    <h1 id="title" className="text-center text-4xl text-SpringGreen my-[2.5rem]">List of Teams {string}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-8 mx-[2.5rem] my-[5rem]">
        {/* {Data.map((t, index) => (
          <div
            id="teamBox"
            key={index}
            className="bg-GunMetal text-white py-2 px-4 rounded-lg text-lg text-center border-[1px] border-transparent hover:border-[1px] hover:border-SpringGreen box-border">
            {t.name}
          </div>
        ))} */}
      </div>
    </>
  );
};





export default Teams
