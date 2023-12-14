const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const cors = require("cors")
const teams = require("./database/teams.json")

const app = express()
const url = "https://fbref.com/en/squads/18bb7c10/Arsenal-Stats"
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
// const formattedDate = `${year}-${month}-${day}`
const formattedDate = `2023-12-05`

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    console.log("Yay")
})

module.exports = app
