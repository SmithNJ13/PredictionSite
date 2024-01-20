const Match = require("../models/Match")
const teams = require("../database/teams.json")

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
const date = `${year}-${month}-${day}`
// const date = `2024-01-02`

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
        const motd = await Match.getByDate(date);

        if (motd && motd.length > 0) {
            const opponentName = motd[0].opponent;
            const matchingTeam = teams.find((team) => team.name === opponentName);

            if (matchingTeam) {
                const response = {
                    motd: motd,
                    icon: matchingTeam.icon,
                    colour: matchingTeam.primary
                };

                res.status(200).send(response);
            } else {
                res.status(404).send({ Error: "Team not found in teams.json" });
            }
        } else {
            res.status(404).send({ Error: "Match not found for the given date" });
        }
    } catch (error) {
        res.status(500).send({ Error: error.message });
    }
}

module.exports = {index, getOne}
