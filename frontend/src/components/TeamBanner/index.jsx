import "./style.css"
import { Triangle } from "react-shapes"

const TeamBanner = ({ icon, name, colour }) => {
  return (
    <>
      <div id="teamBannerWrapper">
        <div id="panel" style={{backgroundColor: colour, border: `1px solid ${colour}`}}>
          <img id="teamIcon" src={icon} alt="Team Icon"></img>
          <h1 id="teamName">{name}</h1>
          <p>xG:</p>
          <div id="inputArea">
            <input id="xG" type="value" placeholder="0.0"></input>
            <button id="button">✔️</button>
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
