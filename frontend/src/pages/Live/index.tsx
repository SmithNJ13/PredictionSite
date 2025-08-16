import { useState, useEffect } from "react";
import { baseURL } from "../../consts/api";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Auth"
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { user } = useAuth()

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

  async function checkExisting(matchID: string) {
    try {
      const response = await axios.get(`${baseURL}/predictions/${user.id}/${matchID}`)
      if(!response.data.existing) {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log("Failed to evaluate prediction status", error)
    }
  }

  async function updateUserStats(mode: string) {
    try {
      const update = await axios.patch(`${baseURL}/users/${user.id}/stats`, {mode})
      return update.data
    } catch (error) {
      console.log("Failed to update user stats: ", error)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, matchID: string, season: number, homeTeam: string, awayTeam: string) {
    e.preventDefault()
    const form = e.currentTarget
    const elements = form.elements as typeof form.elements & {
      home: HTMLInputElement
      away: HTMLInputElement
    }
    const homeXG = elements.home.value ? parseFloat(elements.home.value) : null
    const awayXG = elements.away.value ? parseFloat(elements.away.value) : null

    async function postPrediction() {
      const createdPrediction = await axios.post(`${baseURL}/predictions`, {
        userID: user.id,
        matchID: matchID,
        season: season,
        side: {
          home: {
            predicted_xG: homeXG,
            corners: null,
            cleanSheet: null
          },
          away: {
            predicted_xG: awayXG,
            corners: null,
            cleanSheet: null
          }}},
        {headers: {"Content-Type": "application/json"}})
        if(createdPrediction) {
          return true
        } else {
          return false
        }
    }

    async function updatePrediction() {
      try {
        const updatedPrediction = await axios.patch(`${baseURL}/predictions/${user.id}/${matchID}`, {
          home: {
            predicted_xG: homeXG,
            corners: null,
            cleanSheet: null
          },
          away: {
            predicted_xG: awayXG,
            corners: null,
            cleanSheet: null
          }
        }, {headers: {"Content-Type": "application/json"}})
        return !!updatedPrediction
      } catch (error) {
        console.log("Failed to update prediction", error)
        return false
      }
    }

    const verification = await checkExisting(matchID)
    if(verification === false) {
      await postPrediction()
      await updateUserStats("create")
    } else {
      await updatePrediction()
      await updateUserStats("update")
    }

  }

 
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  useEffect(() => {
    getGames();
  }, []);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const current = `${year}-${month}-${day}`;


return (
  <>
    {date && (
      <div>
        <header className="text-primaryText text-3xl sm:text-4xl font-heading text-center my-8 sm:my-16 font-bold">
          Matches for:{" "}
          <span className="underline decoration-primaryAccent">{dateFormat(date)}</span>
        </header>
      </div>
    )}
    {liveGames && liveGames.length > 0 ? (
      <div className="text-primaryText flex flex-col items-center text-center m-4 sm:m-12 pb-8 space-y-6 sm:space-y-8">
        {liveGames.map((game: Game) => {
          const isExpanded = expandedId === game.match._id;
          return (
            <motion.div 
              key={game.match._id} 
              className="w-full max-w-3xl flex flex-col items-center space-y-4" 
              initial={false}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-bold font-mainInfo my-2 sm:my-4 text-xl sm:text-2xl">{game.match.time}</p>

              {/* Banner Container */}
              <motion.div 
                layout 
                className={`w-full rounded-lg overflow-hidden relative flex flex-col border ${isExpanded ? "border-white" : "border-inactive"} hover:border-white`}
              >
                {/* Clickable Header Row */}
                <div 
                  role="button" 
                  aria-expanded={isExpanded} 
                  onClick={() => toggleExpand(game.match._id)}
                  className="flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-6 py-2 sm:h-20 w-full cursor-pointer select-none space-y-2 sm:space-y-0"
                >
                  {/* Home */}
                  <div className="flex items-center justify-start flex-1 space-x-2 sm:space-x-4">
                    <img src={game.home_icon} alt={`${game.match.home} icon`} className="w-12 h-12 sm:w-14 sm:h-14 object-contain"/>
                    <p className="font-heading font-bold text-white text-lg sm:text-xl truncate">
                      {game.match.home}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="flex justify-center items-center w-16 sm:w-32 flex-none">
                    <p className="font-bold text-lg sm:text-2xl">VS</p>
                  </div>

                  {/* Away */}
                  <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-4">
                    <p className="font-heading font-bold text-white text-lg sm:text-xl truncate">
                      {game.match.away}
                    </p>
                    <img src={game.away_icon} alt={`${game.match.away} icon`} className="w-12 h-12 sm:w-14 sm:h-14 object-contain"/>
                  </div>
                </div>

                {/* Chevron */}
                <div className="flex justify-center pb-2 w-min self-center">
                  <svg 
                    className={`w-5 h-5 text-primaryText transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                    fill="none"
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      exit={{ opacity: 0, height: 0 }} 
                      transition={{ duration: 0.3 }}
                      className="border-t border-inactive"
                    >
                      <form 
                        className="form px-4 sm:px-6 py-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(e, game.match._id, game.match.season, game.match.home, game.match.away);
                        }}
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                          {/* Home XG */}
                          <div className="flex flex-col items-center flex-1">
                            <span className="text-sm font-mainText">XG:</span>
                            <input 
                              type="number" 
                              inputMode="decimal" 
                              min={0} 
                              max={9.99} 
                              step={0.01} 
                              placeholder="0.00" 
                              name="home"
                              className="no-spinner w-20 sm:w-24 text-center rounded border border-borders bg-mainForeground text-primaryText focus:outline-none focus:ring-0 focus:border-primaryAccent"
                              onBlur={(e) => {
                                const t = e.currentTarget;
                                if (t.value === "") return;
                                let n = parseFloat(t.value);
                                if (Number.isNaN(n)) { t.value = ""; return; }
                                n = Math.min(9.99, Math.max(0, n));
                                t.value = n.toFixed(2);
                              }}
                            />
                          </div>

                          {/* Submit */}
                          <button 
                            className="px-6 py-2 bg-mainForeground rounded-lg font-mainInfo border-2 border-transparent hover:border-primaryAccent hover:text-primaryAccent active:bg-primaryAccent active:text-mainForeground active:border-mainForeground flex-none"
                            type="submit"
                          >
                            Submit
                          </button>

                          {/* Away XG */}
                          <div className="flex flex-col items-center flex-1">
                            <span className="text-sm font-mainText">XG:</span>
                            <input 
                              type="number" 
                              inputMode="decimal" 
                              min={0} 
                              max={9.99} 
                              step={0.01} 
                              placeholder="0.00" 
                              name="away"
                              className="no-spinner w-20 sm:w-24 text-center rounded border border-borders bg-mainForeground text-primaryText focus:outline-none focus:ring-0 focus:border-primaryAccent"
                              onBlur={(e) => {
                                const t = e.currentTarget;
                                if (t.value === "") return;
                                let n = parseFloat(t.value);
                                if (Number.isNaN(n)) { t.value = ""; return; }
                                n = Math.min(9.99, Math.max(0, n));
                                t.value = n.toFixed(2);
                              }}
                            />
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    ) : (
      <div className="text-center text-2xl sm:text-4xl text-primaryText font-mainText p-6">
        There are no matches on <span className="font-bold text-primaryAccent">today</span>.
      </div>
    )}
  </>
);
};

export default Live;
