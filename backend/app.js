const express = require("express")
const cors = require("cors")
const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")
const leaderboardRoute = require("./routers/LeaderboardRoute")
const seasons = require("./database/teams.js")
require("./schedulers/cronjob.js")

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON:", err.message);
    return res.status(400).json({ error: "Syntax error in JSON body." });
  }
  next();
});

app.use("/api/matches", MatchRoutes)
app.use("/api/predictions", PredictionRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/leaderboards", leaderboardRoute)
app.get("/api", (req, res) => {
    const welcome = `Welcome to the predictions API, 
        the following endpoints are available: /matches, /predictions, /leaderboards`
        try {
            res.status(200).send(welcome)
        } catch (error) {
            res.status(500).send(error)
        }
})
app.get("/api/teams", (req, res) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const currentSeason = seasons.getSeason(year)
  return res.status(200).send(currentSeason)
})

module.exports = app
