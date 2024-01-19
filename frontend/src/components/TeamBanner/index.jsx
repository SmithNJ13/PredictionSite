import "./style.css"
import { Triangle } from "react-shapes"
import { useState } from "react"

const TeamBanner = ({ team, icon, name, colour }) => {

  const [pxG, setpxG] = useState(0.0)
  
  const handleClick = () => {
    console.log("xG value", pxG)
  }
  return (
    <>
      <div id="teamBannerWrapper">
        <div id="panel" style={{backgroundColor: colour, border: `1px solid ${colour}`}}>
          <img id="teamIcon" src={icon} alt="Team Icon"></img>
          <h1 id="teamName">{name}</h1>
          <p>xG:</p>
          <div id="inputArea">
            <input id="xG" type="number" placeholder="0.0" value={pxG} onChange={(e) => setpxG(parseFloat(e.target.value))}/>
            <button id="button" onClick={handleClick}>✔️</button>
          </div>
        </div>
      <div className="shape">
        <Triangle width={369} height={100} fill={{color: colour}}/>
      </div>
      </div>
    </>
  );
};


export default TeamBanner
