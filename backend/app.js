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

// Update cycle? 10:00 => 15:45 => 17:30 => 19:45 => 22:00

const opponentArray = []
const xg_array = []
const xga_array = []

axios(url)
    .then(response => {
        const HTML = response.data
        const $ = cheerio.load(HTML)

        $("td.left[data-stat='comp']:has(a:contains('Premier League'))").each((index, compElement) => {
            const competition = $(compElement).find("a").text().trim()
            if(competition === "Premier League") {
                const matchDate = $(compElement).closest("tr").find("th.left[data-stat='date']").text().trim();
                if (matchDate.includes(formattedDate)) {
                    const opponent = $(compElement).closest("tr").find("td.left[data-stat='opponent']");
                    const xgFor = $(compElement).closest("tr").find("td.right[data-stat='xg_for']");
                    const xgAgainst = $(compElement).closest("tr").find("td.right[data-stat='xg_against']");
                    
                    opponentArray.push(opponent.text());
                    if (xgFor.text() !== "") {
                        xg_array.push(xgFor.text());
                    }
                    if (xgAgainst.text() !== "") {
                        xga_array.push(xgAgainst.text());
                    }
                }
            }
        })
        if(opponentArray.length < 1) {
            console.log("No Arsenal Premier League matches today!")
        } else {
            opponentArray.forEach((element, index) => {
                console.log(`Today's Opponent: ${element}`)
                if(xg_array[index] !== undefined && xga_array[index] !== undefined) {
                    console.log(`xG: ${xg_array[index]}, xGA: ${xga_array[index]}`)
                }
            })
        }
    })
    .catch(error => {
        console.log("DATA NOT FOUND: ", error)
    })

app.get("/", (req, res) => {
    const todayOpponent = opponentArray[0];
    const teamMatch = teams.find(team => team.name === todayOpponent);
    if (teamMatch) {
        const teamInfo = {
            opponent: todayOpponent,
            xG: xg_array[0],
            xGA: xga_array[0],
            primary: teamMatch.primary,
            secondary: teamMatch.secondary,
            icon: teamMatch.icon
        }
        res.json(teamInfo)
        return teamInfo
    } else {
        res.status(404).send("No team found")
    }
})

module.exports = app
