import { useState, useEffect } from "react";
import "./style.css";
import MatchCard from "../../assets/matchcard.svg?react";

const TeamBanner = ({teamIcon, teamName, colour, inactive, pxG, setpxG}) => {
  const [clicked, setClicked] = useState(false)
  const [size, setSize] = useState({
    fontSize: 30,
    height: 30,
  })

  console.log(teamName.length)
  const sizeHandler = async (teamName) => {
    if(teamName.length > 9) {
      const fontSize = Math.max(10, size.fontSize - (teamName.length / 2));
      const fontSizeStyle = {
        fontSize,
      }
      setSize(fontSizeStyle)
    } else if (teamName.length < 9) {
      setSize({
        fontSize: 30,
      })
    }
  }

  const handleClick = async () => {
    setClicked(true)
    if(inactive) {
      inactive(name)
    }
  }

  useEffect(() => {
    const ids = ["flair", "flair2"];


    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.fill = colour;
      }
    });
  }, [colour]); 

  useEffect(() => {
    sizeHandler(teamName);
  }, [teamName]);
  
  return (
    <>
    <div id="matchcard">
      <MatchCard className="card"/>
      <div id="top">
        <img className="teamIcon" src={teamIcon} alt="Team_Icon"></img>
        <h1 className="teamName" style={size}>{teamName}</h1>
      </div>
      <div id="bottom">
        <p>xG:</p>
        <input className="xG" type="number" placeholder="0.0" value={isNaN(pxG) || pxG === undefined ? "" : pxG} onChange={(e) => setpxG(parseFloat(e.target.value))} disabled={clicked}/>
        <button id="button" onClick={handleClick} disabled={clicked}>✔️</button>
      </div>
    </div>
    </>
  );
};

export default TeamBanner;
