import { useState, useEffect } from "react";
import "./style.css";
import MatchCard from "../../assets/matchcard.svg?react";

const TeamBanner = ({id, matchID, teamIcon, teamName, teamColour, side, buttonClick}) => {
  const [clicked, setClicked] = useState(false)
  const [pxG, setpxG] = useState(0.0)
  const [size, setSize] = useState({fontSize: 34})

  const sizeHandler = (teamName) => {
      if(teamName.length > 15) {
        return Math.max(10, 34 - (teamName.length / 2))
      }
      if(teamName.length > 6 && teamName.length <= 15) {
        return 34 - (teamName.length / 4)
      } else {
        return 34
      }
  }

  const handleClick = () => {
    const pxGDouble = parseFloat(pxG)
    const Info = {
      matchID: matchID,
      teamName: teamName,
      side: side,
      pxG: pxGDouble,
      inactive: true
    }
    console.log(Info)
    setClicked(true)
    buttonClick(Info)
  }

  useEffect(() => {
    const cardId = `#matchcard${id}`
    const cardElement = document.querySelector(cardId)
    if(cardElement) {
      const flair = document.querySelector(`#matchcard${id} #flair`);
      const flair2 = document.querySelector(`#matchcard${id} #flair2`);
      if (flair && flair2) {
        flair.style.fill = teamColour;
        flair2.style.fill = teamColour;
      }
    }
  }, [teamColour, id]); 

  useEffect(() => {
    const fontSize = sizeHandler(teamName)
    setSize({fontSize})
  }, [teamName]);
  
  return (
    <>
    <div id={`matchcard${id}`} className="matchcard">
      <MatchCard className="cardBody"/>
      <div id="top">
        <img className="teamIcon" src={teamIcon} alt="Team_Icon"></img>
        <h1 className="teamName" style={size}>{teamName}</h1>
      </div>
      <div id="bottom">
        <p>xG:</p>
        <input className="xG" type="text" pattern="^\d{0,2}(\.\d{0,2})?$" maxLength="5" placeholder="0" value={pxG === "0" ? "" : pxG} onChange={(e) => { const newValue = e.target.value; if (/^\d{0,2}(\.\d{0,2})?$/.test(newValue)) { setpxG(newValue === "" ? "0" : newValue); } }} disabled={clicked} />
        <button id="button" onClick={handleClick} disabled={clicked}>✔️</button>
      </div>
    </div>
    </>
  );
};

export default TeamBanner;
