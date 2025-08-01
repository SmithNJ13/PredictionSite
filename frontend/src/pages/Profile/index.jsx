import React, { useEffect, useState } from 'react'
import {Target, Trophy} from 'lucide-react'
import { useAuth } from "../../Auth"
import { baseURL } from "../../consts/api"
import axios from "axios"
import StatsCard from '../../components/ProfileStats'
import ProfileBanner from '../../components/ProfileBanner'


const ProfilePage = () => {
  const [sortOrder, setSortOrder] = useState("default")
  const { user } = useAuth()
  const userID = user.id
  const [userEntries, setUserEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 19
  const [userAXG, setUserAXG] = useState()
  const [userTP, setUserTP] = useState()
  const [userRank, setUserRank] = useState()

  const dateFormat = (string) => {
    if (string) {
      const date = new Date(string)
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }
    return "N/A"
  }

  useEffect(() => {
    async function getUserStats() {
      try {
        const response = await axios.get(`${baseURL}/users/${userID}/stats`)
        const userStats = response.data["stats"]
        const userAvgXG = userStats["average_netXG"]
        const userTotalPredictions = userStats["total_predictions"]
        const userRanking = userStats["ranking"]
        setUserRank(userRanking)
        setUserTP(userTotalPredictions)
        setUserAXG(userAvgXG)
      } catch(error) {
        console.log(error)
      }
    }
    getUserStats()
  }, [userID])

  useEffect(() => {
    async function getPredictions() {
      try {
        const response = await axios.get(`${baseURL}/predictions/user/${userID}`)
        const predictions = response.data

        const entries = []
        for (const prediction of predictions) {
          const matchID = prediction.matchID
          const matchedInfo = await axios.get(`${baseURL}/matches/${matchID}`)
          const matchData = matchedInfo.data

          const Entry = {
            date: matchData[0].date,
            matchID: prediction.matchID,
            netXG: prediction.netXG,
            homeTeam: matchData[0].home,
            awayTeam: matchData[0].away,
            homeXG: matchData[0].homeXG,
            awayXG: matchData[0].awayXG,
            side: prediction.side
          }
          entries.push(Entry)
        }

        setUserEntries(entries)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getPredictions()
  }, [userID])

  const handleSort = () => {
    setSortOrder(prev => {
      if (prev === "default") return "asc"
      if (prev === "asc") return "desc"
      return "default"
    })
    setCurrentPage(1)
  }

  const getSortedEntries = () => {
    if (sortOrder === "default") return userEntries
    
    const sorted = [...userEntries].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.netXG - b.netXG
      } else {
        return b.netXG - a.netXG
      }
    })
    return sorted
  }

  const getVisiblePages = (current, total, range = 5) => {
    const half = Math.floor(range / 2)
    let start = Math.max(1, current - half)
    let end = Math.min(total, current + half)

    if (end - start < range - 1) {
      if (start === 1) end = Math.min(total, start + range - 1)
      else if (end === total) start = Math.max(1, total - range + 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  if (!user) return null

  const sortedEntries = getSortedEntries()
  const totalPages = Math.ceil(sortedEntries.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEntries = sortedEntries.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen text-white m-[1rem]">
      <div className="max-w-7xl mx-auto p-6">
        <ProfileBanner user={user} totalNetXG={userAXG} />
        
        <div className="flex flex-row gap-4 mb-8 justify-evenly">
          <StatsCard 
            icon={Target} 
            label="Total Predictions" 
            value={userTP} 
            color="bg-purple-600"
          />
          <StatsCard 
            icon={Trophy} 
            label="Ranking" 
            value={userRank}
            totalPredictions={userTP}
            color="bg-yellow-500"
            type="Ranking"
          />
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white text-center underline">Prediction History</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-slate-400 border-b border-slate-700 select-none">
                    <th className="text-left px-6 py-4 font-medium">Date</th>
                    <th className="text-left px-6 py-4 font-medium">Match</th>
                    <th className="text-center px-6 py-4 font-medium">Corners</th>
                    <th className="text-center px-6 py-4 font-medium">Predicted xG</th>
                    <th className="text-center px-6 py-4 font-medium">Actual xG</th>
                    <th onClick={handleSort} className="text-center px-6 py-4 font-medium hover:cursor-pointer hover:text-red-400">
                      Net xG {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '↕'}
                    </th>
                    <th className="text-center px-6 py-4 font-medium">Clean Sheet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {sortedEntries.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                        Please make a prediction
                      </td>
                    </tr>
                  ) : (
                    sortedEntries.map((entry, index) => {
                      return (
                        <tr key={index} className="hover:bg-slate-700/30 transition-colors cursor-pointer group">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="text-sm text-slate-300">{dateFormat(entry.date)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                <span className="font-medium">{entry.homeTeam}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="font-medium">{entry.awayTeam}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-red-400">{entry.side?.home?.corners || "—"}</span>
                              <span className="text-blue-400">{entry.side?.away?.corners || "—"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-red-400">{entry.side?.home?.predicted_xG?.toFixed(2) || "—"}</span>
                              <span className="text-blue-400">{entry.side?.away?.predicted_xG?.toFixed(2) || "—"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-red-400 font-medium">{entry.homeXG?.toFixed(2) || "—"}</span>
                              <span className="text-blue-400 font-medium">{entry.awayXG?.toFixed(2) || "—"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              entry.netXG >= 0 
                                ? 'bg-emerald-500/20 text-emerald-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {entry.netXG >= 0 ? '+' : ''}{entry.netXG}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-center space-y-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                entry.side?.home?.cleanSheet 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-slate-600/20 text-slate-500'
                              }`}>
                                {entry.side?.home?.cleanSheet ? '✓' : '×'}
                              </div>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                entry.side?.away?.cleanSheet 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-slate-600/20 text-slate-500'
                              }`}>
                                {entry.side?.away?.cleanSheet ? '✓' : '×'}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-2 py-4 sticky bottom-0 bg-slate-900 z-10">
                {totalPages > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 bg-slate-600/50 text-white rounded hover:bg-slate-600 disabled:opacity-30"
                      disabled={currentPage === 1}
                    >
                      «
                    </button>

                    {getVisiblePages(currentPage, totalPages).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded transition-colors ${
                          currentPage === page
                            ? 'bg-white text-black font-bold'
                            : 'bg-slate-600/40 text-slate-300 hover:bg-slate-600/70'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 bg-slate-600/50 text-white rounded hover:bg-slate-600 disabled:opacity-30"
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage