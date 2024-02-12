const Match = require("../models/Match")
const teams = require("../database/teams.json")

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")  
// const date = `${year}-${month}-${day}`
const date = `2024-02-04`

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
        console.log("MotD: ", motd)
        if(motd) {
            const opponent = motd[0].opponent
            const filter = teams.find((team) => team.name === opponent)
            if(filter) {
                const response = {
                    motd: motd,
                    icon: filter.icon,
                    colour: filter.primary
                }
                res.status(200).send(response)
            } else {
                res.status(500).send(`No teams found with name ${opponent}`)
            }
        } else {
            res.status(500).send(`No Arsenal EPL games are on this date: ${date}`)
        }
    } catch (error) {
        res.status(500).send({Error: error})
    }
}

module.exports = {index, getOne}
