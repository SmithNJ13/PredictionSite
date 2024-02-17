import { useState } from "react"
import PredictionTable from "../PredictionTable"
import "./style.css"

const ProfileBanner = () => {
  const userName = "TestAccount96"
  const [totalNetXG, setTotalNetXG] = useState(0)

  const AddNetXG = (netXG) => {
    setTotalNetXG(prevNetXG => prevNetXG + netXG)
  }
  return (
    <>
    <div id="ProfileBox">
        <div id="UserInfo">
            <img className="UserIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/964px-Football_%28soccer_ball%29.svg.png"></img>
            <h1 className="UserTag">{userName} |
            <h6>|</h6>
            <h6 className="rating">{totalNetXG.toFixed(3)}</h6></h1>
        </div>
        <div id="UserDescription">
          <div className="descriptionBox">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempora voluptatibus corrupti explicabo, facilis voluptas qui dicta animi mollitia tenetur voluptatem exercitationem. Recusandae, natus laborum.</p>
          </div>
        </div>
        <div id="PredictionInfo">
            <div className="Header">Prediction History</div>
            <PredictionTable updateNetXG={AddNetXG}/>
        </div>
    </div>
    </>
  )
}

export default ProfileBanner
