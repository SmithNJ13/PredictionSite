const express = require("express")
const cors = require("cors")
const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")
const leaderboardRoute = require("./routers/LeaderboardRoute")
require("./schedulers/cronjob.js")

app.use(cors({
    origin: "https://ps-frontend-tfdz.onrender.com",
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

app.use("/matches", MatchRoutes)
app.use("/predictions", PredictionRoutes)
app.use("/users", UserRoutes)
app.use("/leaderboards", leaderboardRoute)
app.get("/", (req, res) => {
    const welcome = `Welcome to the predictions API, 
        the following endpoints are available: /matches, /predictions, /leaderboards`
        try {
            res.status(200).send(welcome)
        } catch (error) {
            res.status(500).send(error)
        }
})

module.exports = app
