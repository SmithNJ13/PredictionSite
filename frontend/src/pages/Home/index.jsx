import { useState, useEffect } from "react";
import { TeamBanner, AttackMomentum } from "../../components/export";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const [inactive, setInactive] = useState([])
  const [liveGames, setLiveGames] = useState([]);
  const [teamData, setTeamData] = useState([])
  const [date, setDate] = useState("")
  let genCards = 1

  async function getTeams() {
    try { 
        const response = await axios.get("http://localhost:8080/");
        setLiveGames(response.data);
        setDate(response.data[0].match.date);
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}
  
  async function postPrediction(matchID, pxGHome, pxGAway) {
    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          matchID: matchID,
          pxGHome: pxGHome,
          pxGAway: pxGAway
        })
      })
      if(!response.ok) {
        console.log("Failed to create prediction", response.status)
      } else {
        console.log("Prediction created successfully")
      }
    } catch (error) {
      console.log("Error making API call: ", error)
    }
  }

  const handleButton = (data) => {
    setTeamData((prevData) => [...prevData, data])
  }

  const handleInactive = (name, matchID, teamType) => {
    setInactive((prevInactive) => {
      const updatedInactive = [...prevInactive, { name, matchID, teamType }];
      
      const isHomeInactive = updatedInactive.some((item) => item.matchID === matchID && item.teamType === "home");
      const isAwayInactive = updatedInactive.some((item) => item.matchID === matchID && item.teamType === "away");
    
      if (isHomeInactive && isAwayInactive) {
        const teamDataForMatch = teamData.filter((e) => e.matchID === matchID)
        const pxGHome = teamDataForMatch.find((e) => e.side === "home")?.pxG || "0";
        const pxGAway = teamDataForMatch.find((e) => e.side === "away")?.pxG || "0";
        console.log(teamData)
        console.log(teamDataForMatch[0])
        console.log(`This is the pxG for the Home side: ${teamDataForMatch[0].pxG}`)
        console.log(`This is the pxG for the Away side: ${teamDataForMatch[0].pxG}`)
        postPrediction(matchID, pxGHome, pxGAway);
      }
      
      return updatedInactive;
    });
  }

  useEffect(() => {
    getTeams();
    // console.log(teamData)
  }, [teamData]);

  return (
    <>
    <div id="header">
      <header>Matches for: {date}</header>
    </div>
    <div id="content">
        {liveGames.map((game) => {
          return (
          <div key={game.match._id} id={game.match._id}>
            <h4 className="time">Time: {game.match.time}</h4>
            <div className="matchCards">
              <TeamBanner id={genCards++} matchID={game.match._id} teamName={game.match.home} teamIcon={game.home_icon} colour={game.home_colour} inactive={(name) => handleInactive(name, game.match._id, "home")} side={"home"} buttonClick={handleButton}/>
              <div className="text"><h2>VS</h2></div>
              <TeamBanner id={genCards++} matchID={game.match._id} teamName={game.match.away} teamIcon={game.away_icon} colour={game.away_colour} inactive={(name) => handleInactive(name, game.match._id, "away")} side={"away"} buttonClick={handleButton}/>
            </div>
          </div>
          )
        })}
    </div>
    </> 
  );
};

export default HomePage;
