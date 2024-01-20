import "./style.css";
import { Triangle } from "react-shapes";
import { useState } from "react";

const TeamBanner = ({ team, matchID, icon, name, colour }) => {
  const [pxG, setPxG] = useState(0.0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = async () => {
    console.log(`xG value for ${team === 2 ? "Team2" : "Team1"}`, pxG);
    setButtonClicked(true);

    if(team === 1) {
      console.log("Team 1 button disabled")
    }
    if(team === 2) {
      console.log("Team 2 button disabled")

    }

    try {
      const response = await fetch("http://localhost:8080/" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          matchID: matchID,
          pxG: pxG,
          pxGA: team === 2 ? pxG : 0,
        })
      })
      if(!response.ok) {
        console.log("Failed to create prediction:", response.status)
      } else {
        console.log("Prediction created successfully")
      }
    } catch (error) {
      console.log("Error making API call: ", error)
    }
  };

  return (
    <>
      <div id="teamBannerWrapper">
        <div
          id="panel"
          style={{ backgroundColor: colour, border: `1px solid ${colour}` }}
        >
          <img id="teamIcon" src={icon} alt="Team Icon"></img>
          <h1 id="teamName">{name}</h1>
          <p>xG:</p>
          <div id="inputArea">
            <input
              id={`xG${team === 2 ? "A" : ""}`}
              type="number"
              placeholder="0.0"
              value={pxG}
              onChange={(e) => setPxG(parseFloat(e.target.value))}
              disabled={buttonClicked}
            />
            <button
              id="button"
              onClick={handleClick}
              disabled={buttonClicked}
            >
              ✔️
            </button>
          </div>
        </div>
        <div className="shape">
          <Triangle width={369} height={100} fill={{ color: colour }} />
        </div>
      </div>
    </>
  );
};

export default TeamBanner;
