import {useState, useEffect} from "react"
import {TeamBanner} from "../../components/export"
import axios from "axios"
import "./style.css"

const HomePage = () => {
    const Arsenal = "Arsenal"
    const ArsenalIcon = "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?20150520165111"
    const [opponent, setOpponent] = useState("")
    const [icon, setIcon] = useState("")
    const [colour, setColour] = useState("")

    async function getTeams() {
        try {
          const response = await axios.get("http://localhost:8080/")
          const data = response.data
          setOpponent(data.motd[0].opponent)
          setIcon(data.icon)
          setColour(data.colour)
          console.log(data)
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
      <TeamBanner team={1} icon={ArsenalIcon} name={Arsenal} colour="#EF0107"/>
      <div className="text">
        <p>V</p>
      </div>
      <TeamBanner team={2} icon={icon} name={opponent} colour={colour}/>
    </div>
    </>
  )
}

export default HomePage
