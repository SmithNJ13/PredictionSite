const express = require("express")
const cors = require("cors")
const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")
const leaderboardRoute = require("./routers/LeaderboardRoute")
require("./schedulers/cronjob.js")

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use("/matches", MatchRoutes)
app.use("/predictions", PredictionRoutes)
app.use("/users", UserRoutes)
app.use("/leaderboards", leaderboardRoute)

module.exports = app
