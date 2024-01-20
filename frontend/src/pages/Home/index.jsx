import { useState, useEffect } from "react";
import { TeamBanner } from "../../components/export";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const Arsenal = "Arsenal";
  const ArsenalIcon =
    "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?20150520165111";
  const [opponent, setOpponent] = useState("");
  const [icon, setIcon] = useState("");
  const [colour, setColour] = useState("");
  const [matchID, setMatchID] = useState("");

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

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <div className="matches">
        <TeamBanner
          team={1}
          matchID={matchID} // Pass matchID to TeamBanner
          icon={ArsenalIcon}
          name={Arsenal}
          colour="#EF0107"
        />
        <div className="text">
          <p>V</p>
        </div>
        <TeamBanner
          team={2}
          matchID={matchID} // Pass matchID to TeamBanner
          icon={icon}
          name={opponent}
          colour={colour}
        />
      </div>
    </>
  );
};

export default HomePage;
