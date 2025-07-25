const Match = require("../models/Match")
const teams = require("../database/teams.js")

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
const Teams = teams()
// const date = `${year}-${month}-${day}`
const date = `2025-05-25`

const index = async(req, res) => {
    try{
        const match = await Match.getAll()
        res.status(200).send({Match: match})
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

const getLive = async (req, res) => {
    try {
        const liveGames = await Match.getByDate(date);
        const responses = liveGames.map(game => {
            const homeTeam = Teams[game.home]
            const awayTeam = Teams[game.away]
            if(!homeTeam) {
                throw new Error(`Could not find ${game.home}`)
            }
            if(!awayTeam) {
                throw new Error(`Could not find ${game.away}`)
            }
            const response = {
                match: game,
                home_icon: homeTeam["information"].icon,
                home_colour: homeTeam["colours"].primary,
                away_icon: awayTeam["information"].icon,
                away_colour: awayTeam["colours"].primary
            }
            return response
        });
        if (responses.length > 0) {
            res.status(200).send(responses)
        } else { res.status(500).send(`There are no Premier League matches on: ${date}`)}
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const match = await Match.getByID(id)
        res.status(200).send(match)
    } catch (error) {
        res.status(404).send("No matches found")
    }
}

const getByTeam = async (req, res) => {
    try {
        const team = req.params.team
        const match = await Match.getByTeam(team)
        if (!match || match.length === 0) {
            return res.status(404).send(`No matches with team: ${team} found!`);
        }
        res.status(200).send(match)
    } catch (error) {
        res.status(500).send("Server error")
    }
}

module.exports = {index, getLive, getByID, getByTeam}
