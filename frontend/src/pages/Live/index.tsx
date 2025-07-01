import { useState, useEffect } from "react";
import { baseURL } from "../../consts/api";
import { TeamBanner } from "../../components/export";
import axios from "axios";
import "./style.css";

interface MatchData {
  _id: string;
  date: string;
  time: string;
  home: string;
  away: string;
}

interface Game { 
  match: MatchData;
  home_icon: string;
  away_icon: string;
  home_colour: string;
  away_colour: string;
}

interface TeamBannerInfo {
  matchID: string;
  pxG: number;
  side: "home" | "away";
}

const Live = () => {
  const [inactive, setInactive] = useState<TeamBannerInfo[]>([]);
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [date, setDate] = useState<string>("");

  function dateFormat(dateString: string): string {
    const format = dateString.split("-");
    return `${format[2]}-${format[1]}-${format[0]}`;
  }

  async function getGames(): Promise<void> {
    try {
      const response = await axios.get(`${baseURL}/`);
      const data = response.data;
      if (data) {
        setLiveGames(data);
        setDate(data[0].match.date);
      }
    } catch (error) {
      setDate(current);
      console.log(error);
    }
  }

  async function postPrediction(matchID: string, pxGHome: number, pxGAway: number): Promise<void> {
    try {
      const response = await fetch(`${baseURL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          matchID,
          pxGHome,
          pxGAway,
        }),
      });
      if (!response.ok) {
        console.log("Failed to create prediction", response.status);
      }
    } catch (error) {
      console.log("Error making API call: ", error);
    }
  }

  const handleBanners = (info: TeamBannerInfo) => {
    setInactive((prevInactive) => [...prevInactive, info]);
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    inactive.forEach((info) => {
      const matchedBanners = inactive.filter(
        (banner) => banner.matchID === info.matchID
      );
      if (matchedBanners.length === 2) {
        const pxGHome = matchedBanners.find((b) => b.side === "home")?.pxG ?? 0;
        const pxGAway = matchedBanners.find((b) => b.side === "away")?.pxG ?? 0;
        postPrediction(info.matchID, pxGHome, pxGAway);
      }
    });
  }, [inactive]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const current = `${year}-${month}-${day}`;

  let genCards = 1;

  return (
    <>
      <div id="header">
        <header className="text-SpringGreen">Matches for: {dateFormat(date)}</header>
      </div>
      <div id="content">
        {liveGames.map((game: Game) => (
          <div key={game.match._id} id={game.match._id}>
            <h4 className="time text-SpringGreen">Time: {game.match.time}</h4>
            <div className="matchCards">
              <TeamBanner
                id={genCards++}
                matchID={game.match._id}
                teamName={game.match.home}
                teamIcon={game.home_icon}
                teamColour={game.home_colour}
                side={"home"}
                buttonClick={handleBanners}
              />
              <div className="text text-white">
                <h2>VS</h2>
              </div>
              <TeamBanner
                id={genCards++}
                matchID={game.match._id}
                teamName={game.match.away}
                teamIcon={game.away_icon}
                teamColour={game.away_colour}
                side={"away"}
                buttonClick={handleBanners}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Live;
