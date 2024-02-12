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

  async function getTeams() {
    try { 
      const response = await axios.get("http://localhost:8080/");
      const data = response.data;

      // Make sure motd is not empty
      if (data.motd.length > 0) {
        setOpponent(String(data.motd[0].opponent));
        setIcon(data.icon);
        setColour(data.colour);
        setMatchID(data.motd[0]._id);
      } else {
        console.log("No matches of the day (motd) found.");
      }

      console.log(data);
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

  const handleInactive = (name) => {
    setInactive((prevInactive) => [...prevInactive, name])
  }

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
    <AttackMomentum />
      <div id="header">
        <header>Current Match:</header>
      </div>
    <div id="content">
      <div id="currentMatch">
        <TeamBanner
        teamIcon={ArsenalIcon}
        teamName={"Arsenal"}
        colour={"var(--ArsenalRed)"}
        inactive={handleInactive}
        pxG={pxGArsenal}
        setpxG={setpxGArsenal} 
        id={1}/>
        <div className="vs">V</div>
        <TeamBanner 
        teamIcon={icon}
        teamName={opponent}
        colour={colour}
        inactive={handleInactive}
        pxG={pxGOpponent}
        setpxG={setpxGOpponent}
        id={2}/>
      </div>
    </div>
    </>
  );
};

export default HomePage;
