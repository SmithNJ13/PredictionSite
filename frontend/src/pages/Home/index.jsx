import {useState, useEffect} from "react"
import {TeamBanner} from "../../components/export"
import axios from "axios"
import "./style.css"

const HomePage = () => {
    const Arsenal = "Arsenal"
    const ArsenalIcon = "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?20150520165111"
    const NewcastleIcon = "https://resources.premierleague.com/premierleague/badges/t4.png"
    const [opponent, setOpponent] = useState("")
    const [icon, setIcon] = useState("")

    async function getTeams() {
        try {
          const response = await axios.get("http://localhost:8080/")
          const data = response.data
          setOpponent(data.opponent)
          setIcon(data.icon)
        } catch (error) {
          console.log("Error fetching data: ", error)
        }
      }
    
      useEffect(() => {
        getTeams()
      }, [])
    

  return (
    <>
    <div className="matches">
      <TeamBanner icon={ArsenalIcon} name={Arsenal}/>
      <div className="text">
        <p>V</p>
      </div>
      <TeamBanner icon={NewcastleIcon} name={"Newcastle"}/>
    </div>
    </>
  )
}

export default HomePage
