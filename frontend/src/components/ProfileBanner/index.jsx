import { useState } from "react"
import { useAuth } from "../../Auth"
import profileIcon from "../../assets/profileIcon.png"
import PredictionTable from "../PredictionTable"

const ProfileBanner = () => {
  const {user, setUser} = useAuth()
  const [totalNetXG, setTotalNetXG] = useState(0)
  console.log(user)

  const AddNetXG = (netXG) => {
    setTotalNetXG(prevNetXG => prevNetXG + netXG)
  }
  return (
    <>
    <div className="relative flex flex-col justify-center align-center text-center p-[1rem] m-[1rem] bg-transparent border-[1px] border-green-700 rounded h-auto max-w-[1000px] w-[100%] text-white">
        <div className="flex flex-row justify-left p-[1rem] gap-[4px]">
            <img className="relative border-[2px] border-green-400 rounded-[50%] w-[120px] h-[120px] object-cover" src={user.id == 1 ? profileIcon : null}></img>
            <div className="flex flex-row w-[200px] items-center gap-[4px]">
              <h1 className="font-bold">{user.username}</h1>
              <p>|</p>
              <h1 className="text-green-400">{totalNetXG.toFixed(2)}</h1>
            </div>
        </div>
        <div className="relative w-full px-[2rem]">
          <div className="border-b-[2px] border-green-700 rounded-[6px] p-[1rem]">
            <p className="mx-[2rem] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempora voluptatibus corrupti explicabo, facilis voluptas qui dicta animi mollitia tenetur voluptatem exercitationem. Recusandae, natus laborum.</p>
          </div>
        </div>
        <div className="relative m-[1rem]">
            <div className="text-center font-bold">Prediction History</div>
            <PredictionTable updateNetXG={AddNetXG}/>
        </div>
    </div>
    </>
  )
}

export default ProfileBanner
