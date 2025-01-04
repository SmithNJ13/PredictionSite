import { useEffect, useState } from 'react';
import { baseURL } from "../../consts/api";
import axios from "axios"
import "./style.css";

// Setting userID (This will be the actual userID once it's all connected up), and applying red & blue colours for Home & Away
const userID = 1
const homeStyle = {
  color: "#ff5c5c"
}
const awayStyle = {
  color: "#5c80ff"
}

// This is creating the actual table of user Predictions, as well as calculating the netXG
const PredictionTable = ({ updateNetXG }) => {
  const [sortOrder, setSortOrder] = useState('default'); 
  const [userPredictions, setUserPredictions] = useState([])
  const [userEntries, setUserEntries] = useState([])

  function dateFormat(string) {
    const format = string.split("-")
    return `${format[2]}-${format[1]}-${format[0]}`
  }

  useEffect(() => {
    /* Why I'm "combining data" I have no idea ??? It exists in its own format as both a seperate "match information" and "prediction information" with a unique identifer of matchID,
    what am I actually doing here? I think I must have been insane back then. */
    async function combineData() {
      try {
        const predictions = await axios.get(`${baseURL}/predictions/${userID}`) // This is fetching the predictions for a specific user
        const data = predictions.data // And then storing said information as a local variable, good!
        setUserPredictions(data)

        const entries = [] // Empty entries array because... I'm trying to cook something???
        for (const prediction of data) { // For each prediction in the set of "data"...
          const matchID = prediction.matchID
          const matchedInfo = await axios.get(`${baseURL}/matches/${matchID}`)
          const matchData = matchedInfo.data
          // We take all the useful attributes of matchID and then find all of the matches that have the matchIDs found in all of the predictions, okay this works
          // We then store that information as "matchData"... so in theory we have a list of all the matches that have IDs that feature in predictions
          console.log("Matches with their ID featured in predictions: ", matchData)

          const Entry = {
            date: matchData[0].date,
            matchID: prediction.matchID,
            side: prediction.side,
            predicted_xG: prediction.predicted_xG,
            corners: prediction.corners,
            playerToScore: prediction.playerToScore,
            cleanSheet: prediction.cleanSheet
          } /* I am then creating an "Entry" data structure, which contains the date of the match, the matchID (which, we already have?), the side, the predicted_xG, corners, 
           playerToScore and cleanSheet information - so everything found in a prediction. I think I'm overcomplicating this, but sure, we'll go with it... */
          entries.push(Entry)
          console.log(entries)
        }

        let totalNetXG = 0
        let netXGCount = 0;

        for (const entry of entries) { // This is a mess and can absolutely be fixed...
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

  return ( // GOOD GOD THIS NEEDS AN OVERHAUL WHAT AM I DOING?!!?!?!!??!
    <div id="table">
      <table id="info">
        <thead>
          <tr>
            <th>Date</th>
            <th>Match</th>
            <th>1st Player To Score</th>
            <th>Corners</th>
            <th>Predicted xG</th>
            <th>Actual xG</th>
            <th onClick={handleSort} className="netxg">Net xG</th>
            <th>Clean Sheet?</th>
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
