const express = require("express")
const cors = require("cors")
const app = express()
const MatchRoutes = require("./routers/MatchRoutes")
const UserRoutes = require("./routers/UserRoutes") 
const PredictionRoutes = require("./routers/PredictionRoutes")
require("./schedulers/cronjob.js")


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json())

app.use("/", MatchRoutes)
app.use("/", PredictionRoutes)
app.use("/users", UserRoutes)


module.exports = app
