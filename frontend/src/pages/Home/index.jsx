import { useState, useEffect } from "react";
import { TeamBanner } from "../../components/export";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const ArsenalIcon =
    "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?20150520165111";
  const [opponent, setOpponent] = useState("");
  const [icon, setIcon] = useState("");
  const [colour, setColour] = useState("");
  const [matchID, setMatchID] = useState("");
  const [inactive, setInactive] = useState([])

  async function getTeams() {
    try {
      const response = await axios.get("http://localhost:8080/");
      const data = response.data;

      // Make sure motd is not empty
      if (data.motd.length > 0) {
        setOpponent(data.motd[0].opponent);
        setIcon(data.icon);
        setColour(data.colour);
        setMatchID(data.motd[0]._id);
      } else {
        console.log("No matches of the day (motd) found.");
      }

      console.log(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  const handleInactive = (name) => {
    setInactive((prevInactive) => [...prevInactive, name])
  }

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    if(inactive.length === 2) {
      console.log("Both buttons have been disabled")
    }
  }, [inactive])

  return (
    <>
      <div className="matches">
        <TeamBanner
          icon={ArsenalIcon}
          name={"Arsenal"}
          colour={"#EF0107"}
          inactive={handleInactive}
        />
        <div className="text">
          <p>V</p>
        </div>
        <TeamBanner
          icon={icon}
          name={opponent}
          colour={colour}
          inactive={handleInactive}
        />
      </div>
    </>
  );
};

export default HomePage;
