import React, { useState, useEffect } from 'react'
import { baseURL } from "../../consts/api";
import axios from "axios";


const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState([])
  async function getLeaderboard() {
    const response = await axios.get(`${baseURL}/leaderboards`)
    setLeaderboard(response.data)
    console.log(leaderboard)
  }

  useEffect(() => {
    getLeaderboard()
  }, [])

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-inner overflow-hidden w-full max-w-3xl mx-auto my-8">
      <div className="py-4">
        <h2 className="text-xl font-semibold text-center text-white tracking-wide">Leaderboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3 text-center">Total Predictions</th>
              <th className="px-6 py-3 text-center">Net xG</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-white font-bold"># {i + 1}</td>
                <td className="px-6 py-4 text-white hover:underline hover:cursor-pointer">{item.username}</td>
                <td className="px-6 py-4 text-white text-center">{item.total_predictions}</td>
                <td className="px-6 py-4 text-white text-center">{item.average_netXG}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboards
