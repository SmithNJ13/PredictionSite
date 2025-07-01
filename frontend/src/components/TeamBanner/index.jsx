import { baseURL } from "../../consts/api";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAuth } from "../../Auth";
import axios from "axios";
import "./style.css";
import MatchCard from "../../assets/matchcard.svg?react";

const TeamBanner = ({id, matchID, teamIcon, teamName, teamColour, side}) => {
  const [size, setSize] = useState({fontSize: 34})
  const [flipped, setFlipped] = useState(false)
  const { user } = useAuth();

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
  const card = document.querySelector(`#matchcard${id}`)
  // console.log(card)
  setFlipped(true)
  const flair2 = card.querySelector('#flair2');
    if (flair2) {
      flair2.style.display = "none";
    }
}

async function postPrediction (e) {
  const userID = user.id
  e.preventDefault()
  const Form = new FormData(e.target)
  const xG = parseFloat(Form.get("xG"))
  const corners = parseInt(Form.get("corners"))
  const cleanSheet = Form.get("cleanSheet") === "on"
  console.log(side, xG, corners, cleanSheet)

  
  try {
    const userPredictions = await fetch(`${baseURL}/predictions/${userID}/${matchID}`)
    const body = await userPredictions.json()
    if(body.length > 0) {
      if(side == "home") {
        const update = await fetch(`${baseURL}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            matchID: matchID,
            side: {
              home: {
                predicted_xG: xG,
                corners: corners,
                cleanSheet: cleanSheet
              }
            }
          })
        })
        if(!update.ok) {
          console.log("Failed to update prediction", update.status)
        } else {
          console.log("Prediction updated successfully")
        }
      } else {
        const update = await fetch(`${baseURL}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            matchID: matchID,
            side: {
              away: {
                predicted_xG: xG,
                corners: corners,
                cleanSheet: cleanSheet
              }
            }
          })
        })
        if(!update.ok) {
          console.log("Failed to update prediction", update.status)
        } else {
          console.log("Prediction updated successfully")
        }
      }
    } else {
      const response = await fetch(`${baseURL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          matchID: matchID,
          side: {
            home: side === "home" ? {
              predicted_xG: xG,
              corners: corners,
              cleanSheet: cleanSheet
            } : {
              predicted_xG: null,
              corners: null,
              cleanSheet: null
            },
            away: side === "away" ? {
              predicted_xG: xG,
              corners: corners,
              cleanSheet: cleanSheet
            } : {
              predicted_xG: null,
              corners: null,
              cleanSheet: null
            }
          }
        })
      })
      if(!response.ok) {
        console.log("Failed to create prediction", response.status)
      } else {
        console.log("Prediction created successfully")
      }
    }
  } catch (error) {
    console.log("Error making API call: ", error)
  }
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
    <motion.div 
      id={`matchcard${id}`} 
      className="relative w-[300px] h-[440px]"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      animate={{
        rotateY: flipped ? 180 : 0,
        scale: flipped ? [1, 1.1, 1] : 1
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        scale: {duration: 1.5}
      }}>
      
      <div 
        id="front" 
        className="absolute inset-0"
        style={{ 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}>
        <MatchCard className="cardBody"/>
        <div id="top">
          <img id="teamIcon" className="absolute top-[11%] left-[50%] w-[120px] h-[120px]" src={teamIcon} alt="Team_Icon"></img>
          <h1 id="teamName" className="absolute align-center w-[220px] text-white top-[55%] left-[50%]" style={size}>{teamName}</h1>
        </div>
        <div id="bottom" className="absolute bottom-[20%] left-[50%] p-[1px] align-center text-SpringGreen">
          <button className="relative hover:underline" onClick={handleClick}>Place Predictions</button>
        </div>
      </div>

      <div 
        id="back" 
        className="absolute inset-0"
        style={{ 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}>
        <MatchCard className="cardBody"/>
        <div id="predictionSheet" className="absolute top-[10%] left-[20%] align-center justify-center text-white">
          <form className="flex flex-col gap-[20px]" onSubmit={postPrediction}>
            <p className="flex flex-col">xG: <input className="text-black" name="xG"></input></p>
            <p className="flex flex-col">Total Corners: <input className="text-black" name="corners"></input></p>
            <p className="flex flex-col items-center">Clean Sheet? <input className="" type="checkbox" name="cleanSheet"></input></p>
            <button className="ml-[30%] border-white border-[1px] rounded w-[60px] hover:text-SpringGreen">Submit</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamBanner;
