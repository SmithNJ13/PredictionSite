import { useState } from "react"
import PredictionTable from "../PredictionTable"
import "./style.css"

const ProfileBanner = () => {
  const userName = "TestAccount96"
  const value = "-0.33"
  return (
    <>
    <div id="ProfileBox">
        <div id="UserInfo">
            <img className="UserIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/964px-Football_%28soccer_ball%29.svg.png"></img>
            <h1 className="UserTag">{userName} | ({value})</h1>
        </div>
        <div id="PredictionInfo">
            <div className="Header">Prediction History</div>
            <PredictionTable />
        </div>
    </div>
    </>
  )
}

export default ProfileBanner
