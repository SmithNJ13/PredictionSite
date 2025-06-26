import React, { useEffect, useState } from 'react';
import {Target, Trophy} from 'lucide-react';
import { useAuth } from "../../Auth";
import { baseURL } from "../../consts/api";
import axios from "axios";
import StatsCard from '../../components/ProfileStats';
import ProfileBanner from '../../components/ProfileBanner';

const ProfilePage = () => {
  const [sortOrder, setSortOrder] = useState()
  const { user } = useAuth();
  const userID = user.id;
  const [userEntries, setUserEntries] = useState([]);
  const [totalNetXG, setTotalNetXG] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPredictions: 0
  });

  const dateFormat = (string) => {
    if (string) {
      const date = new Date(string);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return "N/A";
  };

  const calculateNetXG = (entry) => {
    const homePredicted = entry.side["home"].predicted_xG !== null;
    const awayPredicted = entry.side["away"].predicted_xG !== null;

    const homeDiff = homePredicted && entry.homeXG != null
      ? -Math.abs(entry.side["home"].predicted_xG - entry.homeXG)
      : 0;

    const awayDiff = awayPredicted && entry.awayXG != null
      ? -Math.abs(entry.side["away"].predicted_xG - entry.awayXG)
      : 0;

    return homeDiff + awayDiff;
  };

  useEffect(() => {
    async function getPredictions() {
      try {
        const response = await axios.get(`${baseURL}/predictions/${userID}`);
        const predictions = response.data;

        const entries = [];
        for (const prediction of predictions) {
          const matchID = prediction.matchID;
          const matchedInfo = await axios.get(`${baseURL}/matches/${matchID}`);
          const matchData = matchedInfo.data;

          const Entry = {
            date: matchData[0].date,
            matchID: prediction.matchID,
            homeTeam: matchData[0].home,
            awayTeam: matchData[0].away,
            homeXG: matchData[0].homeXG,
            awayXG: matchData[0].awayXG,
            side: prediction.side
          };
          entries.push(Entry);
        }

        let totalNetXGValue = 0;
        let netXGCount = 0;
        let cleanSheetCount = 0;

        for (const entry of entries) {
          const netXG = calculateNetXG(entry);
          totalNetXGValue += netXG;
          netXGCount++;
          
          if (entry.side["home"].cleanSheet || entry.side["away"].cleanSheet) {
            cleanSheetCount++;
          }
        }

        const averageNetXG = netXGCount === 0 ? 0 : totalNetXGValue / netXGCount;
        
        setTotalNetXG(averageNetXG);
        setUserEntries(entries);
        setStats({
          totalPredictions: entries.length,
          ladderRanking: "N/A"
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getPredictions();
  }, [userID]);

  const handleSort = () => {
    setSortOrder(prev => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
  };

  const sortedEntries = [...userEntries].sort((a, b) => {
    const netXGA = calculateNetXG(a);
    const netXGB = calculateNetXG(b);

    if (sortOrder === "asc") return netXGA - netXGB;
    if (sortOrder === "desc") return netXGB - netXGA;
    return 0;
  });

  return (
    <div className="min-h-screen text-white m-[1rem]">
      <div className="max-w-7xl mx-auto p-6">
        <ProfileBanner user={user} totalNetXG={totalNetXG} />
        
        {/* Stats Grid */}
        <div className="flex flex-row gap-4 mb-8 justify-evenly">
          <StatsCard 
            icon={Target} 
            label="Total Predictions" 
            value={stats.totalPredictions} 
            color="bg-purple-600"
          />
          <StatsCard 
            icon={Trophy} 
            label="Ranking" 
            value={stats.ladderRanking} 
            color="bg-yellow-600"
          />
        </div>

        {/* Predictions Table */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Prediction History</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-slate-400 border-b border-slate-700 select-none">
                    <th className="text-left px-6 py-4 font-medium">Date</th>
                    <th className="text-left px-6 py-4 font-medium">Match</th>
                    <th className="text-center px-6 py-4 font-medium">First Scorer</th>
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
                  {sortedEntries.map((entry, index) => {
                    const netXGValue = calculateNetXG(entry);
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
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                            {entry.side.home.playerToScore || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-red-400">{entry.side.home.corners || "—"}</span>
                            <span className="text-blue-400">{entry.side.away.corners || "—"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-red-400">{entry.side.home.predicted_xG || "—"}</span>
                            <span className="text-blue-400">{entry.side.away.predicted_xG || "—"}</span>
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
                            netXGValue >= 0 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {netXGValue >= 0 ? '+' : ''}{netXGValue.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center space-y-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              entry.side.home.cleanSheet 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-slate-600/20 text-slate-500'
                            }`}>
                              {entry.side.home.cleanSheet ? '✓' : '×'}
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              entry.side.away.cleanSheet 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-slate-600/20 text-slate-500'
                            }`}>
                              {entry.side.away.cleanSheet ? '✓' : '×'}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage
