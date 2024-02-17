import { useEffect, useState } from 'react';
import axios from "axios"
import "./style.css";

const userID = 1
const homeStyle = {
  color: "#ff5c5c"
}
const awayStyle = {
  color: "#5c80ff"
}

const PredictionTable = ({ updateNetXG }) => {
  const [sortOrder, setSortOrder] = useState('default'); 
  const [userPredictions, setUserPredictions] = useState([])
  const [userEntries, setUserEntries] = useState([])

  function dateFormat(string) {
    const format = string.split("-")
    return `${format[2]}-${format[1]}-${format[0]}`
  }

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

        let totalNetXG = 0
        let netXGCount = 0;

        for (const entry of entries) {
          const homeDiff = entry.home_xG === undefined || entry.home_xG === null ? 0 : -Math.abs(entry.home_pxG - entry.home_xG);
          const awayDiff = entry.away_xG === undefined || entry.away_xG === null ? 0 : -Math.abs(entry.away_pxG - entry.away_xG);
          const netXG = homeDiff + awayDiff;
          
          totalNetXG += netXG;
          netXGCount++;
        }
        const averageNetXG = netXGCount === 0 ? 0 : totalNetXG / netXGCount
        updateNetXG(averageNetXG)
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

  const matchPage= () => {
    console.log("Info!")
  }

  

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
              <tr key={index} className="entry" onClick={matchPage}>
                <td className="date">{dateFormat(e.date)}</td>
                <td className="teams">
                  <p style={homeStyle}>{e.home}</p>
                  <div>V</div>
                  <p style={awayStyle}>{e.away}</p>
                </td>
                <td>
                  <p style={homeStyle}>{e.home_pxG}</p>
                  <br></br>
                  <p style={awayStyle}>{e.away_pxG}</p>
                </td>
                <td>
                  <p style={homeStyle}>{e.home_xG ? e.home_xG : "---"}</p>
                  <br></br>
                  <p style={awayStyle}>{e.away_xG ? e.away_xG : "---"}</p>
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
