import "./style.css"
import { Triangle } from "react-shapes"

const TeamBanner = ({ icon, name }) => {
  return (
    <div id="teamBannerWrapper">
      <div id="panel">
        <img id="teamIcon" src={icon} alt="Team Icon"></img>
        <h1 id="teamName">{name}</h1>
        <p>xG:</p>
        <div id="inputArea">
          <input id="xG" type="value" placeholder="null"></input>
          <button id="button">✔️</button>
        </div>
      </div>
      <Triangle width={300} height={300} fill={{color: "green"}} transform={{transform: "rotate(180deg)"}}/>
    </div>
  );
};


export default TeamBanner
