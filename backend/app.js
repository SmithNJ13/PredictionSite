const express = require("express")
const cors = require("cors")

const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")

app.use(cors())
app.use(express.json())


app.use("/", MatchRoutes)
app.use("/", PredictionRoutes)
app.use("/users", UserRoutes)

module.exports = app
