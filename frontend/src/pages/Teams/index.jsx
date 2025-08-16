import React from 'react'
import { baseURL } from '../../consts/api.ts';
import { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const [teams, setTeams] = useState({});

  async function getSeason() {
    try {
      const response = await axios.get(`${baseURL}/teams`);
      setTeams(response.data.teams);
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    }
  }

  useEffect(() => {
    getSeason();
  }, []);

  return (
    <>
      <h1
        id="title"
        className="text-center text-4xl text-primaryText font-heading my-[2.5rem]"
      >
        List of Teams <span className="underline decoration-primaryAccent">({year}/{year + 1})</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-8 mx-[2.5rem] my-[5rem]">
        {Object.keys(teams).map((teamName) => (
          <div
            key={teamName}
            className="border border-inactive p-4 rounded-lg text-center text-white bg-mainForeground hover:border-primaryAccent hover:cursor-pointer hover:text-primaryAccent"
          >
            {teamName}
          </div>
        ))}
      </div>
    </>
  );
};

export default Teams;


