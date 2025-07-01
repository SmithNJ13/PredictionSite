import React, { useState, useEffect } from 'react'

const Leaderboards = () => {
  const hardcodedUsers = [
    {
      username: "TestUser1",
      stats: {
        total_predictions: 50,
        average_netXG: -0.86,
      },
    },
    {
      username: "TestUser2",
      stats: {
        total_predictions: 36,
        average_netXG: -1.22,
      },
    },
    {
      username: "TestUser3",
      stats: {
        total_predictions: 22,
        average_netXG: -0.19,
      },
    },
    {
      username: "TestUser4",
      stats: {
        total_predictions: 380,
        average_netXG: -3.67,
      },
    },
  ]
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Sort by absolute average_netXG ascending (closer to 0 is better)
    const sorted = [...hardcodedUsers].sort(
      (a, b) => Math.abs(a.stats.average_netXG) - Math.abs(b.stats.average_netXG)
    )

    // Assign ranking based on sort order
    sorted.forEach((user, index) => {
      user.stats.ranking = index + 1
    })

    setUsers(sorted)
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
            {users.map((user, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-white font-bold">#{user.stats.ranking}</td>
                <td className="px-6 py-4 text-white hover:underline hover:cursor-pointer">{user.username}</td>
                <td className="px-6 py-4 text-white text-center">{user.stats.total_predictions}</td>
                <td className="px-6 py-4 text-white text-center">{user.stats.average_netXG.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboards
