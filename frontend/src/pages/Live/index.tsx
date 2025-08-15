import { useState, useEffect } from "react";
import { baseURL } from "../../consts/api";
import { TeamBanner } from "../../components/export";
import axios from "axios";
import "./style.css";

interface MatchData {
  _id: string;
  date: string;
  time: string;
  season: number;
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

const Live = () => {
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [date, setDate] = useState<string>("");

  function dateFormat(dateString: string): string {
    const format = dateString.split("-");
    return `${format[2]}-${format[1]}-${format[0]}`;
  }

  async function getGames(): Promise<void> {
    try {
      const response = await axios.get(`${baseURL}/matches/live`);
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

  useEffect(() => {
    getGames();
  }, []);

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
                season={game.match.season}
                teamName={game.match.home}
                teamIcon={game.home_icon}
                teamColour={game.home_colour}
                side={"home"}
              />
              <div className="text text-white">
                <h2>VS</h2>
              </div>
              <TeamBanner
                id={genCards++}
                matchID={game.match._id}
                season={game.match.season}
                teamName={game.match.away}
                teamIcon={game.away_icon}
                teamColour={game.away_colour}
                side={"away"}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Live;
