const Match = require("../models/Match")
const teams = require("../database/teams.json")

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
// const date = `${year}-${month}-${day}`
const date = `2024-02-17`

const index = async(req, res) => {
    try{
        const match = await Match.getAll()
        res.status(200).send({Match: match})
    }
    catch (error) {
        res.status(500).send({Error: error.message})
    }
}

const getOne = async (req, res) => {
    try {
        const liveGames = await Match.getByDate(date);
        const responses = []
        liveGames.forEach(game => {
            const findHome = teams.find((team) => team.name === game.home)
            const findAway = teams.find((team) => team.name === game.away)
            if(findHome && findAway) {
                const response = {
                    match: game,
                    home_icon: findHome.icon,
                    home_colour: findHome.primary,
                    away_icon: findAway.icon,
                    away_colour: findAway.primary
                }
                responses.push(response)
            } else { res.status(500).send(`Could not find ${findHome} or ${findAway}`)}
        });
        if (responses.length > 0) {
            res.status(200).send(responses)
        } else { res.status(500).send("Array is empty")}
    } catch (error) {
        res.status(500).send(`There are no Premier League matches on today (${date})`)
    }
}

module.exports = {index, getOne}
