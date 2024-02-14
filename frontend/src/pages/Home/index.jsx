import { useState, useEffect } from "react";
import { TeamBanner, AttackMomentum } from "../../components/export";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const ArsenalIcon =
    "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?20150520165111";
  const [opponent, setOpponent] = useState("");
  const [icon, setIcon] = useState("");
  const [colour, setColour] = useState("");
  const [matchID, setMatchID] = useState("");
  const [inactive, setInactive] = useState([])
  const [pxGArsenal, setpxGArsenal] = useState(0.0)
  const [pxGOpponent, setpxGOpponent] = useState(0.0)
  const [liveGames, setLiveGames] = useState([]);
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
  
  async function postPrediction(matchID, pxGArsenal, pxGOpponent) {
    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          matchID: matchID,
          pxG: pxGArsenal,
          pxGA: pxGOpponent
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

  // const handleInactive = (name) => {
  //   setInactive((prevInactive) => [...prevInactive, name])
  // }

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    if(inactive.length === 2) {
      console.log(`The pxG for Arsenal is: ${pxGArsenal} and the pxG for ${opponent} is: ${pxGOpponent}`)
      postPrediction(matchID, pxGArsenal, pxGOpponent)
    }
  }, )

  return (
    <>
    <div id="header">
      <header>Matches for: {date}</header>
    </div>
    <div id="content">
        {liveGames.map((game, index) => {
          return (
          <div key={game.match._id}>
            <h4>Time: {game.match.time}</h4>
            <div className="matchCards">
              <TeamBanner id={genCards++} teamName={game.match.home} teamIcon={game.home_icon} colour={game.home_colour}/>
              <TeamBanner id={genCards++} teamName={game.match.away} teamIcon={game.away_icon} colour={game.away_colour}/>
            </div>
          </div>
          )
        })}
    </div>
    </>
  );
};

export default HomePage;
