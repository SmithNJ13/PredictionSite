import "./style.css"
import { Triangle } from "react-shapes"

const TeamBanner = ({ icon, name }) => {
  return (
    <>
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
      </div>
      <div className="shape">
        <Triangle width={300} height={300} fill={{color: "green"}}/>
      </div>
    </>
  );
};


export default TeamBanner
