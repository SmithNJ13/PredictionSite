const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const cors = require("cors")
const teams = require("./database/teams.json")

const app = express()
const url = "https://fbref.com/en/squads/18bb7c10/Arsenal-Stats"
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")

app.use(cors())
app.use(express.json())


app.use("/", MatchRoutes)
app.use("/", PredictionRoutes)
app.use("/users", UserRoutes)

module.exports = app
