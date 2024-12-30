import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./style.css";
import MatchCard from "../../assets/matchcard.svg?react";

const TeamBanner = ({id, matchID, teamIcon, teamName, teamColour, side, buttonClick}) => {
  const [clicked, setClicked] = useState(false)
  const [pxG, setpxG] = useState(0.0)
  const [size, setSize] = useState({fontSize: 34})
  const [flipped, setFlipped] = useState(false)

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
  console.log(card)
  setFlipped(true)
  const flair2 = card.querySelector('#flair2');
    if (flair2) {
      flair2.style.display = "none";
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
    <>
    <motion.div id={`matchcard${id}`} className="relative w-[300px] h-[440px]" 
    animate={{
      rotateY: flipped ? 180 : 0,
      scale: flipped ? [1, 1.1, 1] : 1
    }}
    transition={{
      duration: 1.5, 
      ease: "easeInOut",
      scale: {duration: 1.5}
      }}>
        {!flipped ? (
          <div id="front">
            <MatchCard className="cardBody"/>
            <div id="top">
              <img id="teamIcon" className="absolute top-[11%] left-[50%] w-[120px] h-[120px]" src={teamIcon} alt="Team_Icon"></img>
              <h1 id="teamName" className="absolute align-center w-[220px] text-white top-[55%] left-[50%]" style={size}>{teamName}</h1>
            </div>
            <div id="bottom" className="absolute bottom-[20%] left-[50%] p-[1px] align-center text-white">
              <button className="relative" onClick={handleClick}>Place Predictions</button>
            </div>
          </div>
        ) : (
          <div id="back">
            <MatchCard className="cardBody"/>
            <div id="predictionSheet" className="absolute top-[10%] left-[20%] align-center justify-center text-white">
              <form className="flex flex-col gap-[20px]">
                <p className="flex flex-col">xG: <input className="text-black"></input></p>
                <p className="flex flex-col">Total Corners: <input className="text-black"></input></p>
                <p className="flex flex-col">First Player to Score: 
                  <select className="text-black">
                  <option>Player1</option>
                  <option>Player2</option>
                  </select></p>
                <p className="flex flex-col items-center">Clean Sheet? <input className="" type="checkbox"></input></p>
                <button className="ml-[30%] border-white border-[1px] rounded w-[60px] hover:text-green-500">Submit</button>
              </form>
            </div>
          </div>
        )}
    </motion.div>
    </>
  );
};

export default TeamBanner;
