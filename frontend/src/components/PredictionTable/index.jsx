import { useEffect, useState } from 'react';
import axios from "axios"
import "./style.css";

const userID = 1
const sampleEntries = [
  {
    date: "2024-01-30",
    home: "Arsenal",
    away: "Liverpool",
    home_pxG: 2.15,
    away_pxG: 1.37,
    home_xG: 1.93,
    away_xG: 1.77
  }
];

const PredictionTable = () => {
  const [sortOrder, setSortOrder] = useState('default'); 
  const [userPredictions, setUserPredictions] = useState([])
  const [userEntries, setUserEntries] = useState([])

  useEffect(() => {
    async function combineData() {
      try {
        const predictions = await axios.get(`http://localhost:8080/predictions/${userID}`)
        const data = predictions.data
        setUserPredictions(data)

        const entries = []
        for (const prediction of data) {
          const matchID = prediction.matchID
          const matchedInfo = await axios.get(`http://localhost:8080/matches/${matchID}`)
          const matchData = matchedInfo.data

          console.log(matchData)
          const Entry = {
            date: matchData[0].date,
            home: matchData[0].home,
            away: matchData[0].away,
            home_pxG: prediction.pxGHome,
            away_pxG: prediction.pxGAway,
            home_xG: matchData[0].homeXG,
            away_xG: matchData[0].awayXG
          }

          entries.push(Entry)
        }
        setUserEntries(entries)
      } catch (error) {
        console.log(error)
      }
  }
  combineData()
}, [userID])

  const handleSort = () => {
    if (sortOrder === 'default') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('default');
    }
  };

  

  const sortedEntries = [...userEntries].sort((a, b) => {
    const homeDifferenceA = (a.home_xG === undefined || a.home_xG === null ? 0 : -Math.abs(a.home_pxG - a.home_xG))
    const awayDifferenceA = (a.away_xG === undefined || a.away_xG === null ? 0 : -Math.abs(a.away_pxG - a.away_xG))
    const netXGA = homeDifferenceA + awayDifferenceA

    const homeDifferenceB = (b.home_xG === undefined || b.home_xG === null ? 0 : -Math.abs(b.home_pxG - b.home_xG))
    const awayDifferenceB = (b.away_xG === undefined || b.away_xG === null ? 0 : -Math.abs(b.away_pxG - b.away_xG))
    const netXGB = homeDifferenceB + awayDifferenceB

    if (sortOrder === 'asc') {
      return netXGA - netXGB
    } else if (sortOrder === 'desc') {
      return netXGB - netXGA
    } else {
      return 0;
    }
  });

  return (
    <div id="table">
      <table id="info">
        <thead>
          <tr>
            <th>Date</th>
            <th>Match</th>
            <th>Predicted xG</th>
            <th>Actual xG</th>
            <th onClick={handleSort} className="netxg">Net xG</th>
          </tr>
        </thead>
        <tbody className="entries">
          {sortedEntries.map((e, index) => {
            const homeDiff = e.home_xG === undefined || e.home_xG === null ? 0 : -Math.abs(e.home_pxG - e.home_xG);
            const awayDiff = e.away_xG === undefined || e.away_xG === null ? 0 : -Math.abs(e.away_pxG - e.away_xG);
            const netXG = (homeDiff + awayDiff)
            return (
              <tr key={index} className="entry">
                <td>{e.date}</td>
                <td className="teams">
                  <p>{e.home}</p>
                  <div>V</div>
                  <p>{e.away}</p>
                </td>
                <td>
                  <p>{e.home_pxG}</p>
                  <br></br>
                  <p>{e.away_pxG}</p>
                </td>
                <td>
                  <p>{e.home_xG ? e.home_xG : "---"}</p>
                  <br></br>
                  <p>{e.away_xG ? e.away_xG : "---"}</p>
                </td>
                <td className="netValue">{netXG.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionTable;
