import { useEffect, useState } from 'react';
import { baseURL } from "../../consts/api";
import { useAuth } from "../../Auth"
import axios from "axios"


const homeStyle = {
  color: "#ff5c5c"
}
const awayStyle = {
  color: "#5c80ff"
}

// This is creating the actual table of user Predictions, as well as calculating the netXG
const PredictionTable = ({ updateNetXG }) => {
  const {user, setUser} = useAuth()
  const uid = user.id
  const [userPredictions, setUserPredictions] = useState([])
  const [userEntries, setUserEntries] = useState([])

  function dateFormat(string) {
    if(string) {
      const format = string.split("-")
      return `${format[2]}-${format[1]}-${format[0]}`
    } else return `00-00-00`
  }

  useEffect(() => {
    async function getPredictions() {
      try {
        const response = await axios.get(`${baseURL}/predictions/user/${uid}`)
        const predictions = response.data
        setUserPredictions(predictions)
        const entries = []
        
        for (const prediction of predictions) {
          const matchID = prediction.matchID
          const matchedInfo = await axios.get(`${baseURL}/matches/${matchID}`)
          const matchData = matchedInfo.data

          const Entry = {
            date: matchData[0].date,
            matchID: prediction.matchID,
            homeTeam: matchData[0].home,
            awayTeam: matchData[0].away,
            homeXG: matchData[0].homeXG,
            awayXG: matchData[0].awayXG,
            side: prediction.side
          }
          entries.push(Entry)
        }

        let totalNetXG = 0
        let netXGCount = 0;

        for (const entry of entries) { 
          const homeDiff = entry.homeXG === undefined || entry.homeXG === null ? 0 : -Math.abs(entry.side["home"].predicted_xG - entry.homeXG);
          const awayDiff = entry.awayXG === undefined || entry.awayXG === null ? 0 : -Math.abs(entry.side["away"].predicted_xG - entry.awayXG);
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
  getPredictions()
}, [uid])

const matchPage= () => {
  console.log(userEntries)
}

  return (
    <div className="flex flex-col m-[4px] items-center justify-evenly w-[100%]">
      <table className="w-[100%] border-[2px] border-green-700 rounded">
        <thead>
          <tr className="p-[8px] text-center bg-black select-none">
            <th>Date</th>
            <th>Match</th>
            <th>1st Player To Score</th>
            <th>Corners</th>
            <th>Predicted xG</th>
            <th>Actual xG</th>
            <th className="hover:text-green-400 hover:cursor-pointer">Net xG</th>
            <th>Clean Sheet?</th>
          </tr>
        </thead>
        <tbody className="entries">
          {userEntries.map((e, index) => {
            const homeDiff = e.homeXG === undefined || e.homeXG === null ? 0 : -Math.abs(e.side["home"].predicted_xG - e.homeXG);
            const awayDiff = e.awayXG === undefined || e.awayXG === null ? 0 : -Math.abs(e.side["away"].predicted_xG - e.awayXG);
            const netXG = (homeDiff + awayDiff)
            return (
              <tr key={index} className="border-b-[2px] border-green-700 bg-gray-800 hover:bg-gray-700 hover:cursor-pointer" onClick={matchPage}>
                <td className="italic">{dateFormat(e.date)}</td>
                <td className="flex flex-col justify-evenly font-bold">
                  <p style={homeStyle}>{e.homeTeam ? e.homeTeam: "home_team"}</p>
                  <div className="font-normal">v</div>
                  <p style={awayStyle}>{e.awayTeam ? e.awayTeam: "away_team"}</p>
                </td>
                <td>
                  <p>{e.side["home"].playerToScore ? e.side["home"].playerToScore : "Player_Name"}</p>
                </td>
                <td>
                  <p style={homeStyle}>{e.side["home"].corners ? e.side["home"].corners : 0}</p>
                  <br></br>
                  <p style={awayStyle}>{e.side["away"].corners ? e.side["away"].corners : 0}</p>
                </td>
                <td>
                  <p style={homeStyle}>{e.side["home"].predicted_xG ? e.side["home"].predicted_xG : "hpXG"}</p>
                  <br></br>
                  <p style={awayStyle}>{e.side["away"].predicted_xG ? e.side["away"].predicted_xG : "apXG"}</p>
                </td>
                <td>
                  <p style={homeStyle}>{e.homeXG ? e.homeXG : "hXG"}</p>
                  <br></br>
                  <p style={awayStyle}>{e.awayXG ? e.awayXG : "aXG"}</p>
                </td>
                <td className="font-bold">{netXG.toFixed(2)}</td>
                <td>
                  <p style={homeStyle}>{e.side["home"].cleanSheet == true ? "yes" : "no"}</p>
                  <br></br>
                  <p style={awayStyle}>{e.side["away"].cleanSheet == true ? "yes" : "no"}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionTable;
