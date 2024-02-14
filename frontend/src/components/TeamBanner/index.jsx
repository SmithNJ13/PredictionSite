import { useState, useEffect } from "react";
import "./style.css";
import MatchCard from "../../assets/matchcard.svg?react";

const TeamBanner = ({teamIcon, teamName, colour, inactive, pxG, setpxG, id}) => {
  const [clicked, setClicked] = useState(false)
  const [size, setSize] = useState({
    fontSize: 34,
  })

  const sizeHandler = async (teamName) => {
    try {
      if(teamName.length > 15) {
        setSize({
          fontSize: Math.max(10, size.fontSize - (teamName.length / 2))
        })
      }
      if(teamName.length > 6 && teamName.length <= 15) {
        const fontSize = size.fontSize - (teamName.length / 4);
        const fontSizeStyle = {
          fontSize,
        }
        setSize(fontSizeStyle)
      } else if (teamName.length <= 6) {
        setSize({
          fontSize: 34,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    setClicked(true)
    if(inactive) {
      inactive(name)
    }
  }

  useEffect(() => {
    const cardId = `#matchcard${id}`
    const cardElement = document.querySelector(cardId)
    if(cardElement) {
      const flair = document.querySelector(`#matchcard${id} #flair`);
      const flair2 = document.querySelector(`#matchcard${id} #flair2`);
      if (flair && flair2) {
        flair.style.fill = colour;
        flair2.style.fill = colour;
      }
    }
  }, [colour]); 

  useEffect(() => {
    sizeHandler(teamName);
  }, [teamName]);
  
  return (
    <>
    <div id={`matchcard${id}`} className="matchcard">
      <MatchCard className="cardBody"/>
      <div id="top">
        <img className="teamIcon" src={teamIcon} alt="Team_Icon"></img>
        <h1 className="teamName" style={size}>{teamName}</h1>
      </div>
      {/* <div id="bottom">
        <p>xG:</p>
        <input className="xG" type="text" pattern="^\d{0,2}(\.\d{0,2})?$" maxLength="5" placeholder="0" value={pxG === "0" ? "" : pxG} onChange={(e) => { const newValue = e.target.value; if (/^\d{0,2}(\.\d{0,2})?$/.test(newValue)) { setpxG(newValue === "" ? "0" : newValue); } }} disabled={clicked} />
        <button id="button" onClick={handleClick} disabled={clicked}>✔️</button>
      </div> */}
    </div>
    </>
  );
};

export default TeamBanner;
