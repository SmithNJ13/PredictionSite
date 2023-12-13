import "./style.css"

const TeamBanner = ({icon, name}) => {
  return (
    <div id="panel">
      <img id="teamIcon" src={icon}></img>
      <h1 id="teamName">{name}</h1>
      <p>xG:</p>
      <div id="inputArea">
        <input id="xG" type="value" placeholder="null"></input>
        <button id="button">✔️</button>
      </div>
    </div>
  )
}

export default TeamBanner
