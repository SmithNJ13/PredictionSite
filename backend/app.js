const express = require("express")
const cors = require("cors")
const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")
const leaderboardRoute = require("./routers/LeaderboardRoute")
require("./schedulers/cronjob.js")

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json())
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
